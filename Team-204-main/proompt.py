import os
import requests
import time
import json

from dotenv import load_dotenv
import logging

load_dotenv()

class Proompt:
	def __init__(self):
		return
	
	def query_openrouter(self, symptoms):
		headers = {
			"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}",
		}
		messages = [
			{
				"role": "system",
				"content": "You are a helpful medical assistant that extracts information from a patient's symptoms and returns a list of possible conditions, along with a short description of how the condition is related to the symptoms. Please address the patient as 'you'. " +
				"You will receive apple watch data from a user. Give personal analysis (and briefly explain reasoning in an easy to understand way) for each of the health topics below based on their data. If the data does not seem realistic or accurate, ignore it, and try to use data from other features. If you still cannot make an accurate analysis, just state that the data is not accurate for that category.'" +
				"Here are the topics: Cardiovascular health, Respiratory health, Energy and activity. Format your response to sentence per topic. Talk like you are talking to the user directly."
			},
			{
				"role": "user",
				"content": f"What are my possible conditions? My symptoms are {symptoms}."
			}
		]
		response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, data=json.dumps({"model": "anthropic/claude-3.5-sonnet", "messages": messages}))
		while response.status_code != 200:
			time.sleep(5)
			response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, data=json.dumps({"model": "anthropic/claude-3.5-sonnet", "messages": messages}))
		return response.json()['choices'][0]['message']['content']
	
	def query_reader(self, payload):
		headers = {
			"Accept" : "application/json",
			"Authorization": f"Bearer {os.environ['HF_TOKEN']}",
			"Content-Type": "application/json" 
		}
		url = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2" 
		response = requests.post(url, headers=headers, json=payload)
		while 'error' in response.json():
			time.sleep(5)
			response = requests.post(url, headers=headers, json=payload)
		condition = response.json()['answer'].strip()
		score = response.json()['score']
		return condition, score
	
	def generate_possible_conditions(self, metrics):
		"""
		Generate a list of symptoms based on the given metrics
		"""
		# get top 5 metrics with largest deviation from mean
		# return list of symptoms associated with those metrics
		# TODO: implement
		return self.query_openrouter(metrics)

	def extract_condition(self, symptoms, possible_conditions):
		"""
		Query the model with the given symptoms to get a possible condition
		"""
		payload = {
			"inputs": {
				"question": f"What are my possible conditions? My symptoms are {symptoms}.",
				"context": possible_conditions,
			},
		}
		return self.query_reader(payload)
	

if __name__ == "__main__":
	proompt = Proompt()
	metrics = "fatigue, increased sensitivity to cold, and dry, itchy skin"
	possible_conditions = proompt.generate_possible_conditions(metrics)
	print(possible_conditions)
	condition, score = proompt.extract_condition(metrics, possible_conditions)
	print(condition, score) # Expected: "Hypothyroidism", number between 0 and 1