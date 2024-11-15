# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import re
from pymongo import MongoClient
import faiss

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS if you have a front-end

# Load spaCy model and Sentence Transformer
nlp = spacy.load('en_core_web_sm')
model = SentenceTransformer('all-MiniLM-L6-v2')

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Use your MongoDB URI
db = client['wordbox_db']
notes_collection = db['notes']

# Initialize FAISS index
dimension = 384  # Dimension of 'all-MiniLM-L6-v2' embeddings
index = faiss.IndexFlatL2(dimension)

# Helper functions
def detect_phone_numbers(text):
    phone_pattern = r'(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)'
    matches = re.findall(phone_pattern, text)
    return matches

def generate_tags(text):
    doc = nlp(text)
    tags = [chunk.text for chunk in doc.noun_chunks]

    # Detect phone numbers
    phone_numbers = detect_phone_numbers(text)
    if phone_numbers:
        tags.append('phone number')

    return tags

def generate_embedding(text):
    embedding = model.encode(text)
    return embedding

# Routes
@app.route('/add_note', methods=['POST'])
def add_note():
    data = request.json
    note_content = data.get('content')

    # Generate tags and embedding
    tags = generate_tags(note_content)
    embedding = generate_embedding(note_content)

    # Save to MongoDB
    note = {
        'content': note_content,
        'tags': tags,
        'embedding': embedding.tolist()  # Convert to list for JSON serialization
    }
    result = notes_collection.insert_one(note)

    # Add embedding to FAISS index
    index.add(np.array([embedding]).astype('float32'))

    return jsonify({'status': 'success', 'note_id': str(result.inserted_id)})

@app.route('/search', methods=['GET'])
def search_notes():
    query = request.args.get('q')

    # Generate query embedding and tags
    query_embedding = generate_embedding(query)
    query_tags = generate_tags(query)

    # Perform FAISS search
    k = 10  # Number of nearest neighbors
    D, I = index.search(np.array([query_embedding]).astype('float32'), k)

    # Retrieve notes from MongoDB
    notes = list(notes_collection.find())
    matched_notes = [notes[i] for i in I[0] if i < len(notes)]

    # Compute combined scores
    combined_results = []
    for note in matched_notes:
        note_tags = note['tags']
        tag_match_score = len(set(query_tags).intersection(set(note_tags))) * 0.5  # Adjust weight
        embedding_score = cosine_similarity(
            [query_embedding], [np.array(note['embedding'])])[0][0]
        combined_score = embedding_score + tag_match_score
        note['score'] = combined_score
        combined_results.append(note)

    # Sort notes by combined score
    combined_results.sort(key=lambda x: x['score'], reverse=True)

    return jsonify({'results': combined_results})

if __name__ == '__main__':
    app.run(debug=True)
