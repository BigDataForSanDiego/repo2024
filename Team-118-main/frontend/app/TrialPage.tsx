import React,{ useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const TrialPage = () => {

    const [expandedTrialId, setExpandedTrialId] = useState(null);

    const handleToggle = (id) => {
        // Toggle the specific trial index
        setExpandedTrialId(expandedTrialId === id ? null : id);
    };

  const trialData1 = {
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
      "veteran_status": false,
      "disability_status": false,
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
    },
    "disqualifications": {
      "ageRange": {
        "minAge": 66,
        "maxAge": 100
      },
      "gender": "None",
      "race": "None",
      "veteran_status": true,
      "disability_status": true,
      "past_conditions": [
        "Heart Disease",
        "Chronic Kidney Disease"
      ],
      "immunization": "None",
      "observation": [
        "Severe allergies to medications",
        "History of cancer"
      ],
      "allergies": [
        "Penicillin",
        "Aspirin"
      ],
      "procedure": "None"
    }
  };

  const trialDataset = [
        {
            "id": 1,
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
                "veteran_status": false,
                "disability_status": false,
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
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 66,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Heart Disease",
                    "Chronic Kidney Disease"
                ],
                "immunization": "None",
                "observation": [
                    "Severe allergies to medications",
                    "History of cancer"
                ],
                "allergies": [
                    "Penicillin",
                    "Aspirin"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 2,
            "name": "Phase 3 Clinical Trial for New Breast Cancer Treatment",
            "location": {
                "city": "Houston",
                "state": "TX",
                "zip": "77030"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 35,
                    "maxAge": 75
                },
                "gender": "Female",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "Stage 2 Breast Cancer",
                    "Stage 3 Breast Cancer"
                ],
                "immunization": "None required",
                "observation": [
                    "Tumor progression",
                    "Side effects of treatment",
                    "Blood test results"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Weekly intravenous infusion of trial drug for 6 months, followed by monthly monitoring."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 76,
                    "maxAge": 100
                },
                "gender": "Male",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Stage 4 Breast Cancer",
                    "Liver Disease",
                    "Severe Cardiovascular Conditions"
                ],
                "immunization": "None required",
                "observation": [
                    "Severe allergic reactions",
                    "Organ failure"
                ],
                "allergies": [
                    "Severe allergy to chemotherapy drugs"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 3,
            "name": "Phase 1 Clinical Trial for New Heart Disease Treatment",
            "location": {
                "city": "Chicago",
                "state": "IL",
                "zip": "60611"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 40,
                    "maxAge": 70
                },
                "gender": "Any",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "Coronary Artery Disease",
                    "Hypertension"
                ],
                "immunization": "Up-to-date flu vaccination",
                "observation": [
                    "Cholesterol levels",
                    "Blood pressure",
                    "Cardiac function (ECG)"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Monthly injections of trial drug for 4 months, with bi-weekly cardiac monitoring."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 71,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Congestive Heart Failure",
                    "Stroke",
                    "Kidney Failure"
                ],
                "immunization": "None",
                "observation": [
                    "History of severe allergic reactions",
                    "Liver disease"
                ],
                "allergies": [
                    "Severe allergy to cardiovascular medications"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 4,
            "name": "Phase 2 Clinical Trial for HIV Preventative Medication",
            "location": {
                "city": "New York",
                "state": "NY",
                "zip": "10016"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 18,
                    "maxAge": 55
                },
                "gender": "Any",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "HIV-negative",
                    "High-risk exposure to HIV"
                ],
                "immunization": "None required",
                "observation": [
                    "HIV status",
                    "Immune response markers",
                    "Adverse reactions"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Daily oral tablet for 6 months, with monthly follow-ups and blood tests."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 56,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "HIV-positive",
                    "Autoimmune disorders",
                    "Liver disease"
                ],
                "immunization": "None required",
                "observation": [
                    "Severe drug reactions",
                    "Liver enzyme abnormalities"
                ],
                "allergies": [
                    "Severe allergic reactions to antiretroviral medications"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 5,
            "name": "Phase 2 Clinical Trial for HIV Preventative Medication",
            "location": {
                "city": "New York",
                "state": "NY",
                "zip": "10016"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 18,
                    "maxAge": 55
                },
                "gender": "Any",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "HIV-negative",
                    "High-risk exposure to HIV"
                ],
                "immunization": "None required",
                "observation": [
                    "HIV status",
                    "Immune response markers",
                    "Adverse reactions"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Daily oral tablet for 6 months, with monthly follow-ups and blood tests."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 56,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "HIV-positive",
                    "Autoimmune disorders",
                    "Liver disease"
                ],
                "immunization": "None required",
                "observation": [
                    "Severe drug reactions",
                    "Liver enzyme abnormalities"
                ],
                "allergies": [
                    "Severe allergic reactions to antiretroviral medications"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 6,
            "name": "Phase 1 Clinical Trial for Fahr's Disease Treatment",
            "location": {
                "city": "Boston",
                "state": "MA",
                "zip": "02115"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 25,
                    "maxAge": 60
                },
                "gender": "Any",
                "race": "Asian",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "Diagnosed with Fahr's Disease",
                    "Cognitive Decline",
                    "Movement Disorders"
                ],
                "immunization": "Up-to-date on standard vaccinations",
                "observation": [
                    "Calcium deposits in brain (via CT scan)",
                    "Cognitive function tests",
                    "Motor control assessment"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Monthly infusion of experimental drug for 8 months, with bi-weekly neurological exams."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 61,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Severe Kidney Dysfunction",
                    "Uncontrolled Seizures",
                    "Psychiatric Disorders"
                ],
                "immunization": "None required",
                "observation": [
                    "Severe reactions to trial medication",
                    "Brain hemorrhaging"
                ],
                "allergies": [
                    "Severe reactions to neurotropic drugs"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 7,
            "name": "Phase 1 Clinical Trial for Peripheral Artery Disease Treatment",
            "location": {
                "city": "Los Angeles",
                "state": "CA",
                "zip": "90089"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 45,
                    "maxAge": 80
                },
                "gender": "Any",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "Peripheral Artery Disease",
                    "Hypertension",
                    "Chronic Leg Pain"
                ],
                "immunization": "Up-to-date flu vaccination",
                "observation": [
                    "Blood flow to lower limbs",
                    "Pain during walking (Claudication)",
                    "Ankle-brachial index (ABI)"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Bi-weekly intravenous administration of trial drug for 6 months, with monthly vascular imaging and pain assessment."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 81,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Severe Heart Failure",
                    "Stroke",
                    "Kidney Failure"
                ],
                "immunization": "None required",
                "observation": [
                    "History of blood clots",
                    "Uncontrolled diabetes"
                ],
                "allergies": [
                    "Severe allergy to vascular medications"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 8,
            "name": "Phase 2 Clinical Trial for Hormone-Receptor Positive Breast Cancer",
            "location": {
                "city": "Seattle",
                "state": "WA",
                "zip": "98109"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 40,
                    "maxAge": 75
                },
                "gender": "Female",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "Hormone-Receptor Positive Breast Cancer",
                    "Stage 2 or 3 Breast Cancer"
                ],
                "immunization": "None required",
                "observation": [
                    "Tumor response to treatment",
                    "Hormone levels",
                    "Bone density (to assess risk of osteoporosis)"
                ],
                "allergies": [
                    "None"
                ],
                "procedure": "Daily oral medication combined with monthly hormone injections for 9 months, with bi-weekly monitoring."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 76,
                    "maxAge": 100
                },
                "gender": "Male",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Triple-negative Breast Cancer",
                    "Severe Osteoporosis",
                    "History of Endometrial Cancer"
                ],
                "immunization": "None required",
                "observation": [
                    "Severe allergic reaction to hormone treatments",
                    "Liver or kidney dysfunction"
                ],
                "allergies": [
                    "Severe reaction to estrogen-modulating drugs"
                ],
                "procedure": "None"
            }
        },
        {
            "id": 9,
            "name": "Phase 1 Clinical Trial for General Health Multivitamin Supplement",
            "location": {
                "city": "Miami",
                "state": "FL",
                "zip": "33101"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 18,
                    "maxAge": 75
                },
                "gender": "Any",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "Generally healthy or minor chronic conditions (e.g., mild hypertension, seasonal allergies)"
                ],
                "immunization": "Up-to-date on general vaccinations (e.g., flu, tetanus)",
                "observation": [
                    "General well-being",
                    "Energy levels",
                    "Vitamin levels (measured via blood tests)",
                    "Sleep quality",
                    "Cognitive function"
                ],
                "allergies": [
                    "None or mild allergies (e.g., food allergies managed by diet)"
                ],
                "procedure": "Daily oral multivitamin tablet for 6 months, with monthly check-ins for general health assessments and blood tests."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 76,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Severe chronic conditions (e.g., cancer, severe heart disease, kidney failure)"
                ],
                "allergies": [
                    "Severe allergies to common vitamin ingredients"
                ]
            }
        },
        {
            "id": 10,
            "name": "Phase 2 Clinical Trial for Dietary Intervention in Weight Management",
            "location": {
                "city": "Chicago",
                "state": "IL",
                "zip": "60614"
            },
            "qualifications": {
                "ageRange": {
                    "minAge": 18,
                    "maxAge": 70
                },
                "gender": "Any",
                "race": "Any",
                "veteran_status": false,
                "disability_status": false,
                "past_conditions": [
                    "Overweight or mildly obese (BMI 25-35)",
                    "Generally healthy individuals with no major chronic conditions"
                ],
                "immunization": "Up-to-date on general vaccinations",
                "observation": [
                    "Weight changes (measured monthly)",
                    "Dietary adherence (via food diaries)",
                    "Physical activity levels (self-reported)",
                    "Body measurements (waist circumference, etc.)"
                ],
                "allergies": [
                    "None or manageable allergies (e.g., gluten-free, lactose-free alternatives available)"
                ],
                "procedure": "Participate in a 12-month dietary intervention program with monthly group sessions, dietary guidelines provided, and weekly check-ins."
            },
            "disqualifications": {
                "ageRange": {
                    "minAge": 71,
                    "maxAge": 100
                },
                "gender": "None",
                "race": "None",
                "veteran_status": true,
                "disability_status": true,
                "past_conditions": [
                    "Severe eating disorders (e.g., anorexia, bulimia)",
                    "Severe metabolic conditions (e.g., uncontrolled diabetes)"
                ],
                "allergies": [
                    "Severe allergies to dietary components (e.g., peanuts, shellfish)"
                ]
            }
        }
    ]

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#FFFFFF' }}>
      <ScrollView>
        {trialDataset.map((trial) => (
            <TouchableOpacity key={trial.id} style={styles.card} onPress={() => handleToggle(trial.id)}>
            <Text style={styles.title}>{trial.name}</Text>
            <Text style={styles.location}>
              Location: {trial.location.city}, {trial.location.state} {trial.location.zip}
            </Text>
  
          {expandedTrialId === trial.id && (
              <>
              <Text style={styles.sectionTitle}>Qualifications:</Text>
              <Text style={styles.info}>Age Range: {trial.qualifications.ageRange.minAge} - {trial.qualifications.ageRange.maxAge}</Text>
              <Text style={styles.info}>Gender: {trial.qualifications.gender}</Text>
              <Text style={styles.info}>Race: {trial.qualifications.race}</Text>
              <Text style={styles.info}>Veteran Status: {trial.qualifications.veteran_status ? 'Yes' : 'No'}</Text>
              <Text style={styles.info}>Disability Status: {trial.qualifications.disability_status ? 'Yes' : 'No'}</Text>
              <Text style={styles.info}>Past Conditions: {trial.qualifications.past_conditions.join(', ')}</Text>
              <Text style={styles.info}>Immunization: {trial.qualifications.immunization}</Text>
              <Text style={styles.info}>Observations: {trial.qualifications.observation.join(', ')}</Text>
              <Text style={styles.info}>Allergies: {trial.qualifications.allergies.join(', ')}</Text>
              <Text style={styles.info}>Procedure: {trial.qualifications.procedure}</Text>
    
              <Text style={styles.sectionTitle}>Disqualifications:</Text>
              <Text style={styles.info}>Age Range: {trial.disqualifications.ageRange.minAge} - {trial.disqualifications.ageRange.maxAge}</Text>
              <Text style={styles.info}>Gender: {trial.disqualifications.gender}</Text>
              <Text style={styles.info}>Race: {trial.disqualifications.race}</Text>
              <Text style={styles.info}>Veteran Status: {trial.disqualifications.veteran_status ? 'Yes' : 'No'}</Text>
              <Text style={styles.info}>Disability Status: {trial.disqualifications.disability_status ? 'Yes' : 'No'}</Text>
              <Text style={styles.info}>Past Conditions: {trial.disqualifications.past_conditions.join(', ')}</Text>
              <Text style={styles.info}>Immunization: {trial.disqualifications.immunization}</Text>
              <Text style={styles.info}>Allergies: {trial.disqualifications.allergies.join(', ')}</Text>
              <Text style={styles.info}>Procedure: {trial.disqualifications.procedure}</Text></>
          )}
          </TouchableOpacity>
        ))}
        
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E5F3F4',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default TrialPage;