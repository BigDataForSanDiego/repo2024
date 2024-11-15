import React, { useState, useEffect } from 'react';
import "../css/patients.css"; 
import PatientDietaryNeeds from '../components/PatientDietaryNeeds';
import axios from "axios";

export default function Patients() {
    const [patients, setPatients] = useState([]); // State to store all patients data
    const [selectedPatient, setSelectedPatient] = useState(null); // State to store selected patient data
    const [searchId, setSearchId] = useState(""); // State to store the ID input
    const [error, setError] = useState(null); // State to store any errors

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:3000/patient-data"); // Update with your backend URL
                setPatients(response.data); // Set the fetched data to the state
                console.log(response)
            } catch (err) {
                console.error("Error fetching patients:", err);
                setError("Error fetching patient data"); // Set error state
            }
        };

        fetchPatients(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Function to handle the search by patient ID
    const handleSearch = () => {
        const patient = patients.find(patient => patient.id === searchId);
        console.log(searchId)
        if (patient) {
            setSelectedPatient(patient);
            setError(null);
        } else {
            setError("Patient not found");
            setSelectedPatient(null);
        }
    };

    return (
      <div className="patients-container">
        {selectedPatient ? (
        <div className="sharp">
                      <img 
                          src={"/src/assets/images/sharp.png"} 
                          className='picture'
                      />
        </div>
        ):""}
          <h1>Patients</h1>
          {error && <p className="error">{error}</p>}
          
          <div className="search-bar">
              <input 
                  type="text" 
                  placeholder="Enter Patient ID" 
                  value={searchId} 
                  onChange={(e) => setSearchId(e.target.value)} 
              />
              <button onClick={handleSearch}>Search</button>
          </div>
  
          {selectedPatient ? (
              <div className="patient-card">
                  <div className="dietary-restrictions">
                      <h3>Dietary Restrictions:</h3>
                      <ul>
                          {Object.entries(selectedPatient.dietary_restrictions.restrictions_amounts).map(([key, value]) => (
                              <li key={key}>
                                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="patient-info">
                      <h2 className="patient-title">Patient Information</h2>
                      <p><strong>Name:</strong> {selectedPatient.name}</p>
                      <p><strong>Age:</strong> {selectedPatient.age} years old</p>
                      <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                      <p><strong>Height:</strong> {selectedPatient.height_cm} cm</p>
                      <p><strong>Weight:</strong> {selectedPatient.weight_kg} kg</p>
                      <p><strong>Blood Type:</strong> {selectedPatient.blood_type}</p>
                      <p><strong>Medical Conditions:</strong> {selectedPatient.medical_conditions.join(', ') || "None"}</p>
                      <p><strong>Last Checkup:</strong> {new Date(selectedPatient.last_checkup_date).toLocaleDateString()}</p>
                      <p><strong>Next Checkup Due:</strong> {new Date(selectedPatient.next_checkup_due).toLocaleDateString()}</p>
                      <h3>Medications:</h3>
                      <ul>
                          {selectedPatient.medications.map((medication, index) => (
                              <li key={index}>
                                  {medication.name} - {medication.dosage_mg} mg, {medication.frequency}
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="profile-picture">
                      <img 
                          src={"/src/assets/images/pfp.png"} 
                          className='picture'
                      />
                  </div>
              </div>
          ) : (
              <p>Please enter a Patient ID to see their information.</p>
          )}
          {/* Pass searchId to PatientDietaryNeeds component */}
          {selectedPatient && <PatientDietaryNeeds searchId={selectedPatient.id} />}
      </div>
  );
}
  

