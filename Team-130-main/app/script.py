from langchain_community.llms import Ollama
import streamlit as st
import os

# Custom CSS for styling
st.markdown("""
    <style>
    .main {
        background-color: #f0f2f6;
        color: #000000;
    }
    .title {
        font-size: 2.5em;
        font-weight: bold;
        color: #4B9CD3;
        text-align: center;
        margin-bottom: 20px;
    }
    .button-style {
        background-color: #4B9CD3;
        color: white;
        padding: 0.5em 1.5em;
        border: none;
        border-radius: 8px;
        font-size: 1.1em;
    }
    .textarea-style {
        background-color: #ffffff;
        color: #000000;
        padding: 10px;
        border-radius: 8px;
    }
    .response-box {
        background-color: #e0f7fa;
        border-radius: 10px;
        padding: 15px;
        margin-top: 15px;
        font-size: 1.1em;
        color: #004d40;
    }
    </style>
    """, unsafe_allow_html=True)

# Initial Prompt to define the model's purpose
initial_prompt = """
You are a compassionate and understanding mental health assistant. Your role is to support users by listening to their concerns,
offering thoughtful and empathetic advice, and helping them navigate emotional challenges. You should always respond in a calm,
reassuring, and non-judgmental tone. When giving advice, focus on promoting emotional well-being and offering practical 
suggestions for managing stress, anxiety, or other mental health concerns. Respond concisely, with no more than three sentences.
"""

# Create or load a session variable to store the conversation history
if "conversation_history" not in st.session_state:
    # Include the initial prompt in the conversation history
    st.session_state.conversation_history = initial_prompt

llm = Ollama(model="llama3.2")

# Function to generate a summary of the conversation using the LLM
def generate_summary(conversation):
    # Using the model to summarize the conversation
    prompt = f"Please summarize the following conversation in a concise manner. Include both the user's inputs and the assistant's responses:\n\n{conversation}\n\nSummary:"
    # Collect the output from the generator into a single string
    summary = ''.join(llm.stream(prompt, stop=['<|eot_id|>']))
    return summary

# Main title
st.markdown('<div class="title">Mental Health Assistant Chat</div>', unsafe_allow_html=True)

# Add a button to clear the conversation history
if st.button("🧹 Clear Conversation", key="clear", help="Clear the entire conversation"):
    st.session_state.conversation_history = initial_prompt
    st.write("Conversation history has been cleared.")

# Upload patient history file
uploaded_file = st.file_uploader("Upload patient history", type="txt")
if uploaded_file is not None:
    # Read and display the uploaded file's content
    patient_info = uploaded_file.read().decode("utf-8")
    st.write("Patient History Uploaded:")
    st.text(patient_info)

    # Generate questions based on the uploaded history
    if st.button("Generate Questions Based on History"):
        full_prompt = f"Based on the following patient information, ask relevant mental health-related questions concisely (no more than three sentences):\n\n{patient_info}\n"
        with st.spinner("Generating questions..."):
            response = ''.join(llm.stream(full_prompt, stop=['<|eot_id|>']))
            st.write("Questions for the patient:")
            st.write(response)

# User input text box with custom style
st.markdown('<h4>What’s on your mind today?</h4>', unsafe_allow_html=True)
prompt = st.text_area("Enter your prompt:", placeholder="Type your thoughts here...", label_visibility="collapsed", height=150)

# Generate button directly below the prompt input
if st.button("💬 Generate Response", key="generate", help="Generate AI response to the prompt"):
    if prompt:
        # Concatenate the previous conversation history with the new user input
        full_prompt = f"{st.session_state.conversation_history}\nUser: {prompt}\nAI (respond concisely, no more than three sentences):"
        # Display a spinner while generating the response
        with st.spinner("Generating response..."):
            response = ''.join(llm.stream(full_prompt, stop=['<|eot_id|>']))
            
            # Display the response in a styled box
            st.markdown('<div class="response-box">', unsafe_allow_html=True)
            st.write(response)
            st.markdown('</div>', unsafe_allow_html=True)
            
            # Update the conversation history with the new exchange
            st.session_state.conversation_history += f"\nUser: {prompt}\nAI: {response}\n"

# Button to summarize the conversation and save it to a file
if st.button("Summarize and Send Info", key="summarize"):
    # Generate a summary of the conversation using the model
    with st.spinner("Summarizing conversation..."):
        summary_content = generate_summary(st.session_state.conversation_history)
    
    # Save the summary to a file
    file_name = "patient_summary.txt"
    with open(file_name, "w") as file:
        file.write(summary_content)
    
    st.success(f"Summary saved as {file_name}.")
    st.download_button(label="Download Summary", data=summary_content, file_name=file_name, mime="text/plain")
