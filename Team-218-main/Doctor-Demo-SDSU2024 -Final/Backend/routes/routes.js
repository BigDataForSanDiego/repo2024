const express = require('express');
const router = express.Router();
//const schemas = require('../models/Account');
const schemas = require('../models/Patient');

// Route to handle contact form
router.post('/contact/:a', async (req, res) => {
    const { name, email, website, message } = req.body;
    const action = req.params.a;

    switch(action) {
        case "send":
            const contactData = { name, email, website, message };
            const newContact = new schemas.Contact(contactData);
            const saveContact = await newContact.save();
            if (saveContact) {
                res.send('Message sent. Thank you!');
            } else {
                res.send('Message failed to send');
            }
            break;
        default:
            res.send("Invalid response");
            break;
    }

    res.end();
});

// Route to fetch all users
router.get('/users', async (req, res) => {
    const users = schemas.Accounts;
    const userData = await users.find({}).exec(); 

    if (userData) {
        res.send(JSON.stringify(userData));
    }
});

// Route to handle patient data from MongoDB Atlas
router.get('/patient-data', async (req, res) => {
    console.log("Received request for patient data");
    try {
        // Fetch all patient data from the Patient schema
        const patients = await schemas.Patient.find({}).exec();
        // Check if patients data is found
        if (patients) {
            res.status(200).json(patients);  // Return patients as JSON response
        } else {
            res.status(404).send("No patients found");
        }
    } catch (error) {
        console.error("Error fetching patient data:", error);
        res.status(500).send("Error fetching patient data");
    }
});

// Fetch a patient by their ID
router.get('/patient-data/:id', async (req, res) => {
    try {
        const patient = await schemas.Patient.findOne({ id: req.params.id });
        if (!patient) {
            return res.status(404).send("Patient not found");
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).send("Error fetching patient data");
    }
});

// Update dietary restrictions for a patient
router.put('/patients/:id/dietary_restrictions', async (req, res) => {
    const { dietaryNeeds } = req.body; // Expecting dietary needs in the request body
    try {
        const patient = await schemas.Patient.findOneAndUpdate(
            { id: req.params.id }, // Find patient by the custom ID field
            { dietary_restrictions: { restrictions_amounts: dietaryNeeds } }, // Update the dietary restrictions
            { new: true } // Return the updated document
        );
        if (!patient) {
            return res.status(404).send("Patient not found");
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error("Error updating dietary needs:", error);
        res.status(500).send("Error updating dietary needs");
    }
});


// Route to handle new account signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const accountData = { name, email, password };
    const newAccount = new schemas.Account(accountData);
    const saveAccount = await newAccount.save();

    if (saveAccount) {
        console.log("Account made!");
        res.status(201).send("Account created successfully");
    } else {
        res.status(500).send("Error creating account");
    }
});

module.exports = router;
