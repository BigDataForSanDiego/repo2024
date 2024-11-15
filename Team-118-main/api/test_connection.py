import pymongo
import sys
import json

##Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set and specify the read preference as secondary preferred
client = pymongo.MongoClient('mongodb+srv://catlib:VMRGf0Ey0CNgvNgB@trialize.gs0xa.mongodb.net/?retryWrites=true&w=majority&appName=trialize') 

##Specify the database to be used
db = client.trialize_main

##Insert a single document
db.trials.insert_one({
            "name": "Phase 2 Clinical Trial for Type 2 Diabetes Medication",
            "location": {
                "city": "San Francisco",
                "state": "CA",
                "zip": "94103"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 18,
                    "maxAge": 65
                },
                "gender": "Any",
                "race": "Any",
                "veteran_status": False,
                "disability_status": False,
                "past_conditions": [
                    "Type 2 Diabetes",
                    "High Blood Pressure"
                ],
                "immunization": "Up-to-date COVID-19 vaccination",
                "observation": [
                    "Glucose levels",
                    "Blood pressure",
                    "Body mass index"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Daily oral medication for 12 weeks, with bi-weekly check-ins."
            }
        })

##Find the document that was previously written
x = db.trials.find_one({'name':'Phase 2 Clinical Trial for Type 2 Diabetes Medication'})

## Print the result to the screen
print(x[''])

## Close the connection
client.close()