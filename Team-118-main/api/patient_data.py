from typing import List, Dict
import json
from jsonschema import validate, ValidationError

fp = 'synth_data/patient_data/'
with open(f"{fp}patient_schema.json", 'r') as schema_file:
    patient_schema = json.load(schema_file)

print(patient_schema)

"""
These we have to get from somewhere (most likely Sharp's user database)
"""
def get_age(mrn: str) -> int:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_location(mrn: str) -> Dict:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_gender(mrn: str) -> str:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_race(mrn: str) -> str:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_veteran_status(mrn: str) -> bool:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_disability_status(mrn: str) -> bool:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

"""
All of these are from SHP Patient Access API in the form GET [base]/[thing]?patient=[MRN]
ex. GET [base]/Condition?patient=000001
"""
def get_condition(mrn: str) -> List:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_immunization(mrn: str) -> Dict:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def observations(mrn: str) -> List:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_allergy_intolerance(mrn: str) -> List:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_procedures(mrn: str) -> List:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_medications_requests(mrn: str) -> List:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)

def get_goal(mrn: str) -> str:
    with open(f"{fp}{mrn}.json", 'r') as patient_json:
        print(patient_json)


