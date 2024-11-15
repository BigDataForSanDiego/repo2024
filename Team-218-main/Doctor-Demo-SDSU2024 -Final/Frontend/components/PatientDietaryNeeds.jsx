import React, { useState, useEffect } from 'react';
import axios from 'axios';

const dietaryOptions = [
    { label: 'Carbohydrates', value: 'carbohydrates' },
    { label: 'Proteins', value: 'proteins' },
    { label: 'Fats', value: 'fats' },
    { label: 'Fiber', value: 'fiber' },
    { label: 'Sugars', value: 'sugars' },
    { label: 'Sodium', value: 'sodium' },
    { label: 'Potassium', value: 'potassium' },
    { label: 'Calcium', value: 'calcium' },
    { label: 'Iron', value: 'iron' },
    { label: 'Vitamin A', value: 'vitamin_a' },
    { label: 'Vitamin C', value: 'vitamin_c' },
    { label: 'Vitamin D', value: 'vitamin_d' },
    { label: 'Vitamin E', value: 'vitamin_e' },
    { label: 'Vitamin K', value: 'vitamin_k' },
    { label: 'Vitamin B1 (Thiamine)', value: 'vitamin_b1' },
    { label: 'Vitamin B2 (Riboflavin)', value: 'vitamin_b2' },
    { label: 'Vitamin B3 (Niacin)', value: 'vitamin_b3' },
    { label: 'Vitamin B6', value: 'vitamin_b6' },
    { label: 'Vitamin B12', value: 'vitamin_b12' },
    { label: 'Folate', value: 'folate' },
];

const restrictionOptions = [
    { label: 'Carbohydrates', value: 'carbohydrates' },
    { label: 'Proteins', value: 'proteins' },
    { label: 'Fats', value: 'fats' },
    { label: 'Fiber', value: 'fiber' },
    { label: 'Sugars', value: 'sugars' },
    { label: 'Sodium', value: 'sodium' },
    { label: 'Potassium', value: 'potassium' },
    { label: 'Calcium', value: 'calcium' },
    { label: 'Iron', value: 'iron' },
    { label: 'Vitamin A', value: 'vitamin_a' },
    { label: 'Vitamin C', value: 'vitamin_c' },
    { label: 'Vitamin D', value: 'vitamin_d' },
    { label: 'Vitamin E', value: 'vitamin_e' },
    { label: 'Vitamin K', value: 'vitamin_k' },
    { label: 'Vitamin B1 (Thiamine)', value: 'vitamin_b1' },
    { label: 'Vitamin B2 (Riboflavin)', value: 'vitamin_b2' },
    { label: 'Vitamin B3 (Niacin)', value: 'vitamin_b3' },
    { label: 'Vitamin B6', value: 'vitamin_b6' },
    { label: 'Vitamin B12', value: 'vitamin_b12' },
    { label: 'Folate', value: 'folate' },
    { label: 'Gluten', value: 'gluten' },
    { label: 'Dairy', value: 'dairy' },
    { label: 'Nuts', value: 'nuts' },
    { label: 'Shellfish', value: 'shellfish' },
    { label: 'Soy', value: 'soy' },
];

const measurementOptions = [
    { label: 'Grams', value: 'g' },
    { label: 'Milligrams', value: 'mg' },
    // Add more measurement options as needed
];

const PatientDietaryNeeds = ({ searchId }) => {
    const [patient, setPatient] = useState(null);
    const [selectedDietaryNeed, setSelectedDietaryNeed] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedMeasurement, setSelectedMeasurement] = useState('');
    const [selectedRestriction, setSelectedRestriction] = useState('');
    const [restrictionAmount, setRestrictionAmount] = useState(''); // New state for restriction amount
    const [restrictionMeasurement, setRestrictionMeasurement] = useState(''); // New state for restriction measurement
    const [error, setError] = useState('');

    // Fetch patient data when patientId changes
    useEffect(() => {
        const fetchPatient = async () => {
            if (!searchId) return; // Don't fetch if patientId is empty

            try {
                const response = await axios.get(`http://localhost:3000/patient-data/${searchId}`);
                console.log("THE ID: " + searchId);
                setPatient(response.data); // Expect response.data to be the patient object
            } catch (err) {
                console.error("Error fetching patient:", err);
                setError("Error fetching patient data");
            }
        };

        fetchPatient();
    }, [searchId]);

    const handleAddDietaryNeed = () => {
        if (!patient || !selectedDietaryNeed || !amount || !selectedMeasurement) return; // Don't proceed if patient is not set or fields are empty

        const newDietaryNeed = {
            need: selectedDietaryNeed,
            amount: parseFloat(amount), // Convert to float for the amount
            measurement: selectedMeasurement, // Add measurement to the dietary need
        };

        const updatedNeeds = [...(patient.dietaryNeeds || []), newDietaryNeed];
        setPatient({ ...patient, dietaryNeeds: updatedNeeds });
        setSelectedDietaryNeed('');
        setAmount('');
        setSelectedMeasurement('');
        // Optionally send the update to the server here
    };

    const handleRemoveDietaryNeed = (index) => {
        if (!patient) return; // Don't proceed if patient is not set

        const updatedNeeds = patient.dietaryNeeds.filter((_, i) => i !== index);
        setPatient({ ...patient, dietaryNeeds: updatedNeeds });
        // Optionally send the update to the server here
    };

    const handleAddRestriction = () => {
        if (!patient || !selectedRestriction || !restrictionAmount || !restrictionMeasurement) return; // Don't proceed if patient is not set or fields are empty

        const newRestriction = {
            restriction: selectedRestriction,
            amount: parseFloat(restrictionAmount), // Convert to float for the amount
            measurement: restrictionMeasurement, // Add measurement to the restriction
        };

        const updatedRestrictions = [...(patient.dietaryRestrictions || []), newRestriction];
        setPatient({ ...patient, dietaryRestrictions: updatedRestrictions });
        setSelectedRestriction('');
        setRestrictionAmount('');
        setRestrictionMeasurement('');
        // Optionally send the update to the server here
    };

    const handleRemoveRestriction = (index) => {
        if (!patient) return; // Don't proceed if patient is not set

        const updatedRestrictions = patient.dietaryRestrictions.filter((_, i) => i !== index);
        setPatient({ ...patient, dietaryRestrictions: updatedRestrictions });
        // Optionally send the update to the server here
    };

    return (
        <div>
            <h1>Dietary Needs and Restrictions for Patient ID: {searchId}</h1>
            {error && <p>{error}</p>}
            {patient ? (
                <div>
                    <h2>{patient.name}</h2>
                    <h3>Dietary Needs</h3>
                    <ul>
                        {patient.dietaryNeeds?.map((need, index) => (
                            <li key={index}>
                                {need.need}: {need.amount} {need.measurement}
                                <button onClick={() => handleRemoveDietaryNeed(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <select
                            value={selectedDietaryNeed}
                            onChange={(e) => setSelectedDietaryNeed(e.target.value)}
                        >
                            <option value="">Select Dietary Need</option>
                            {dietaryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            placeholder="Amount" 
                        />
                        <select
                            value={selectedMeasurement}
                            onChange={(e) => setSelectedMeasurement(e.target.value)}
                        >
                            <option value="">Select Measurement</option>
                            {measurementOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleAddDietaryNeed}>Add Dietary Need</button>
                    </div>

                    <h3>Dietary Restrictions</h3>
                    <ul>
                        {patient.dietaryRestrictions?.map((restriction, index) => (
                            <li key={index}>
                                {restriction.restriction}: {restriction.amount} {restriction.measurement}
                                <button onClick={() => handleRemoveRestriction(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <select
                            value={selectedRestriction}
                            onChange={(e) => setSelectedRestriction(e.target.value)}
                        >
                            <option value="">Select Dietary Restriction</option>
                            {restrictionOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input 
                            type="number" 
                            value={restrictionAmount} 
                            onChange={(e) => setRestrictionAmount(e.target.value)} 
                            placeholder="Amount" 
                        />
                        <select
                            value={restrictionMeasurement}
                            onChange={(e) => setRestrictionMeasurement(e.target.value)}
                        >
                            <option value="">Select Measurement</option>
                            {measurementOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleAddRestriction}>Add Dietary Restriction</button>
                    </div>
                </div>
            ) : (
                <p>Loading patient data...</p>
            )}
        </div>
    );
};

export default PatientDietaryNeeds;
