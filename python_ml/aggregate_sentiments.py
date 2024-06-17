import json
from textblob import TextBlob
import matplotlib.pyplot as plt

# Load tweets from the JSON file
with open('data/cleaned_bitcoin_tweets.json', 'r') as file:
    tweets = json.load(file)
    
# Initialize counters
positive_count = 0
neutral_count = 0
negative_count = 0

# Function to analyze sentiment
def analyze_sentiment(tweet):
    analysis = TextBlob(tweet)
    if analysis.sentiment.polarity > 0:
        return 'Positive'
    elif analysis.sentiment.polarity == 0:
        return 'Neutral'
    else:
        return 'Negative'

# Analyze sentiment of each tweet and update counters
for tweet in tweets:
    sentiment = analyze_sentiment(tweet)
    if sentiment == 'Positive':
        positive_count += 1
    elif sentiment == 'Neutral':
        neutral_count += 1
    else:  # Negative
        negative_count += 1
        
# Print the counts to the console
print(f"Positive: {positive_count}, Neutral: {neutral_count}, Negative: {negative_count}")

# Setup Chart and Data Plot
labels = 'Positive', 'Neutral', 'Negative'
sizes = [positive_count, neutral_count, negative_count]
colors = ['lightgreen', 'gold', 'lightcoral']
explode = (0.1, 0, 0)  # explode 1st slice

# Plot
plt.figure(figsize=(8, 6))
plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
plt.title('Sentiment Analysis of Bitcoin Tweets')
plt.show()

