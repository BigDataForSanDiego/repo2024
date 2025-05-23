from flask import Blueprint, render_template, current_app
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use the Agg backend to prevent GUI issues
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
import base64
from collections import Counter
from wordcloud import WordCloud, STOPWORDS

admin_bp = Blueprint('admin_bp', __name__)

# Helper function to convert matplotlib figure to base64
def convert_fig_to_base64(fig):
    buffer = BytesIO()
    fig.savefig(buffer, format='png', bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    plt.close(fig)  # Close the figure to free memory
    buffer.close()
    return image_base64

@admin_bp.route('/dashboard')
def admin_dashboard():
    try:
        # Get feedback data directly from MongoDB using the app's database connection
        feedback_collection = current_app.config['MONGO_DB']['feedback']
        feedback_data = list(feedback_collection.find({}))
        
        if not feedback_data:
            return "No feedback data available"
            
        # Convert to pandas DataFrame
        df = pd.DataFrame(feedback_data)
        
        # Pre-process data safely using .get() for sentiment fields
        df['sentiment_label'] = df['sentiment'].apply(lambda x: x.get('label', 'UNKNOWN'))
        df['sentiment_score'] = df['sentiment'].apply(lambda x: x.get('score', 0))  # Default score to 0 if missing
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')  # Handle possible invalid timestamps
        
        charts = {}
        
        # Define a common figure size for consistency
        fig_size = (8, 4)

        # 1. Sentiment Pie Chart
        fig, ax = plt.subplots(figsize=fig_size)
        sentiment_counts = df['sentiment_label'].value_counts()
        ax.pie(sentiment_counts, labels=sentiment_counts.index, autopct='%1.1f%%', 
               startangle=90, colors=sns.color_palette('pastel'))
        ax.set_title('Sentiment Distribution')
        charts['sentiment_pie'] = convert_fig_to_base64(fig)

        # 2. Sentiment Score Distribution
        fig, ax = plt.subplots(figsize=fig_size)
        sns.histplot(data=df, x='sentiment_score', bins=20, kde=True)
        ax.set_title('Distribution of Sentiment Scores')
        ax.set_xlabel('Sentiment Score')
        ax.set_ylabel('Count')
        charts['sentiment_histogram'] = convert_fig_to_base64(fig)
        
        # 3. Most Frequent Keywords
        all_keywords = [kw for keywords in df['keywords'] for kw in keywords]
        keyword_counts = Counter(all_keywords)
        keyword_df = pd.DataFrame(keyword_counts.items(), 
                                columns=['keyword', 'count']).nlargest(10, 'count')

        # Create the bar plot with a different color palette and horizontal orientation
        fig, ax = plt.subplots(figsize=fig_size)
        sns.barplot(data=keyword_df, y='keyword', x='count', palette="pastel")  # Horizontal orientation and pastel palette
        ax.set_title('Top 10 Most Frequent Keywords')
        ax.set_ylabel('Keyword')
        ax.set_xlabel('Count')
        plt.tight_layout()
        charts['keyword_bar'] = convert_fig_to_base64(fig)

        # 4. Category Distribution
        fig, ax = plt.subplots(figsize=fig_size)
        category_exploded = df.explode('category')
        sns.countplot(data=category_exploded, x='category', order=category_exploded['category'].value_counts().index, palette="pastel")
        ax.set_title('Feedback Distribution by Category')
        ax.set_xlabel('Count')
        plt.tight_layout()
        charts['category_bar'] = convert_fig_to_base64(fig)

        # 5. Sentiment Over Time with Specific Column
        fig, ax = plt.subplots(figsize=fig_size)
        sns.lineplot(x='timestamp', y='sentiment_score', data=df, marker='o', color='b')
        plt.title('Sentiment Score Over Time')
        plt.xlabel('Date')
        plt.ylabel('Sentiment Score')
        plt.xticks(rotation=45)
        plt.grid(True)
        plt.tight_layout()
        charts['sentiment_score_over_time'] = convert_fig_to_base64(fig)
        
        # 6. Average Sentiment Score Over Time
        fig, ax = plt.subplots(figsize=fig_size)
        df_average_sentiment = df.groupby(df['timestamp'].dt.date)['sentiment_score'].mean().reset_index()
        sns.lineplot(x='timestamp', y='sentiment_score', data=df_average_sentiment, marker='o', ax=ax)
        ax.set_title('Average Sentiment Score Over Time')
        ax.set_xlabel('Date')
        ax.set_ylabel('Average Sentiment Score')
        plt.xticks(rotation=45)
        plt.tight_layout()
        charts['average_sentiment_over_time'] = convert_fig_to_base64(fig)

        # 7. Word Cloud
        custom_stopwords = set(['Kevin', 'kevin', 'Hannah', 'hannah', 'Kevin Hannah', 'Sharp', 'sharp', 'SHARP'])
        stopwords = STOPWORDS.union(custom_stopwords)
        if all_keywords:
            wordcloud = WordCloud(width=800, height=400, background_color='white', colormap='viridis', max_words=100, stopwords=stopwords).generate(' '.join(all_keywords))
            fig, ax = plt.subplots(figsize=fig_size)
            ax.imshow(wordcloud, interpolation='bilinear')
            ax.axis('off')
            ax.set_title('Keyword Word Cloud')
            charts['wordcloud'] = convert_fig_to_base64(fig)
        else:
            charts['wordcloud'] = None

        # 8. Keyword Frequency Heatmap
        keyword_category_matrix = df.explode('category').explode('keywords')
        keyword_category_counts = keyword_category_matrix.groupby(['category', 'keywords']).size().unstack(fill_value=0)
        fig, ax = plt.subplots(figsize=fig_size)
        sns.heatmap(keyword_category_counts, cmap='Blues', ax=ax)
        ax.set_title('Keyword Frequency by Category')
        plt.tight_layout()
        charts['keyword_heatmap'] = convert_fig_to_base64(fig)

        return render_template('admin_dashboard.html', charts=charts)
        
    except Exception as e:
        return f"Error generating dashboard: {str(e)}"
