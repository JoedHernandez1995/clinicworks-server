const express = require('express')
const router = express.Router()
const doctorEducationController = require("../controllers/doctorEducation.controller");
// Retrieve all patients
router.get('/', doctorEducationController.findAll);

// Retrieve doctor education by doctor id
router.get('/doctor/:doctor_id', doctorEducationController.findByDoctorId);

// Create a new doctor education
router.post('/', doctorEducationController.create);
// Retrieve a single doctor education by id
router.get('/:doctor_education_id', doctorEducationController.findById);
// Update a doctor with id
router.put('/:doctor_education_id', doctorEducationController.update);
// Delete a doctor with id
router.delete('/:doctor_education_id', doctorEducationController.delete);

module.exports = router