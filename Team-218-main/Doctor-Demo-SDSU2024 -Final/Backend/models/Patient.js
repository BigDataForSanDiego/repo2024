const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
    name: { type: String, required: true },
    dosage_mg: { type: Number, required: true },
    frequency: { type: String, required: true }
});

const dietaryRestrictionsSchema = new Schema({
    gluten_free: { type: Boolean, default: false },
    lactose_free: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    diabetic: { type: Boolean, default: false },
    kosher: { type: Boolean, default: false },
    low_sodium: { type: Boolean, default: false },
    low_fat: { type: Boolean, default: false },
    low_cholesterol: { type: Boolean, default: false },
    restrictions_amounts: {
        sodium: { type: String, default: "0g" },
        gluten: { type: String, default: "0g" },
        lactose: { type: String, default: "0g" },
        fat: { type: String, default: "0g" },
        meat: { type: String, default: "0g" },
        dairy: { type: String, default: "0g" },
        sugar: { type: String, default: "0g" },
        carbohydrates: { type: String, default: "0g" },
        cholesterol: { type: String, default: "0mg" }
    }
});

const patientSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height_cm: { type: Number, required: true },
    weight_kg: { type: Number, required: true },
    blood_type: { type: String, required: true },
    medical_conditions: { type: [String], default: [] },
    medications: { type: [medicationSchema], default: [] },
    dietary_restrictions: { type: dietaryRestrictionsSchema, default: {} },
    last_checkup_date: { type: Date, default: Date.now },
    next_checkup_due: { type: Date, required: true }
});

const Patient = mongoose.model('Patient', patientSchema, 'patient_data'); 



module.exports = { Patient };
