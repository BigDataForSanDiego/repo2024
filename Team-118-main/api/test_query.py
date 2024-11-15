import pymongo
import sys
import json


client = pymongo.MongoClient('mongodb+srv://molit:cr78tq47o4DTEuem@trialize.gs0xa.mongodb.net/?retryWrites=true&w=majority&appName=trialize') 

## Specify the database to be used
db = client.trialize_main

## Load patient data
with open('synth_data/patient_data/19.json') as file:
    patient = json.load(file)

query = {
    "qualifications.ageRange.minAge": {"$lte": patient["age"]},
    "qualifications.ageRange.maxAge": {"$gte": patient["age"]},
        "$or": [
        {"qualifications.gender": "Any"},
        {"qualifications.gender": patient["gender"]}
    ],
    "qualifications.veteran_status": patient["veteranstatus"],
    "qualifications.disability_status": patient["disabilitystatus"],
    "qualifications.past_conditions": {"$regex": "^John$", "$options": "i" }
}

matching_trials = db.trials.find(query)

for trial in matching_trials:
    print(trial)

## Close the connection
client.close()