const express = require('express')
const router = express.Router()
const diagnosisController = require("../controllers/diagnosis.controller");
// Retrieve all patients
router.get('/', diagnosisController.findAll);

// Retrieve diagnosis by patient id
router.get('/patient/:patient_id', diagnosisController.findByPatientId);

// Retrieve diagnosis by doctor id
router.get('/doctor/:doctor_diagnosis_id', diagnosisController.findByDoctorId);

// Retrieve diagnosis by patient id and doctor id
router.get('/patientAndDoctor/:patient_id/:doctor_diagnosis_id', diagnosisController.findByPatientAndDoctorId);

// Create a new diagnosis education
router.post('/', diagnosisController.create);
// Retrieve a single diagnosis education by id
router.get('/:diagnosis_id', diagnosisController.findById);
// Update a diagnosis with id
router.put('/:diagnosis_id', diagnosisController.update);
// Delete a diagnosis with id
router.delete('/:diagnosis_id', diagnosisController.delete);

module.exports = router