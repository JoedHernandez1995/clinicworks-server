const Diagnosis = require('../models/diagnosis.model');


exports.findAll = function (req, res) {
    Diagnosis.findAll(function (err, diagnosis) {
        if (err)
            res.send(err);
        res.send(diagnosis);
    });
};

exports.findByPatientId = function (req, res) {
    Diagnosis.findByPatientId(req.params.patient_id, function (err, diagnosis) {
        if (err)
            res.send(err);
        res.send(diagnosis);
    });
};

exports.findByDoctorId = function (req, res) {
    Diagnosis.findByDoctord(req.params.doctor_id, function (err, diagnosis) {
        if (err)
            res.send(err);
        res.send(diagnosis);
    });
};

exports.findByPatientAndDoctorId = function (req, res) {
    Diagnosis.findByPatientAndDoctorId(req.params.patient_id, req.params.doctor_diagnosis_id, function (err, diagnosis) {
        if (err)
            res.send(err);
        res.send(diagnosis);
    });
};

exports.create = function (req, res) {
    const new_doctor = new Diagnosis(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Diagnosis.create(new_doctor, function (err, diagnosis) {
            if (err)
                res.send(err);
            res.status(200).send({...req.body});
        });
    }
};

exports.findById = function (req, res) {
    Diagnosis.findById(req.params.diagnosis_id, function (err, diagnosis) {
        if (err)
            res.send(err);
        res.json(diagnosis);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Diagnosis.update(req.params.diagnosis_id, new Diagnosis(req.body), function (err, diagnosis) {
            if (err)
                res.send(err);
            res.status(200).send({ ...req.body });
        });
    }
};

exports.delete = function (req, res) {
    Diagnosis.delete(req.params.diagnosis_id, function (err, diagnosis) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Diagnosis successfully deleted' });
    });
};