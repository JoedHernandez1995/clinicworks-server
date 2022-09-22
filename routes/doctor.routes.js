const express = require('express')
const router = express.Router()
const doctorController = require("../controllers/doctor.controller");
// Retrieve all patients
router.get('/', doctorController.findAll);

// Retrieve doctor by user id
router.get('/user/:id', doctorController.findByUserId);

// Create a new doctor
router.post('/', doctorController.create);
// Retrieve a single doctor with id
router.get('/:id', doctorController.findById);
// Update a doctor with id
router.put('/:id', doctorController.update);
// Delete a doctor with id
router.delete('/:id', doctorController.delete);

module.exports = router