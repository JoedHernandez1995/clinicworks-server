const DoctorEducation = require('../models/doctorEducation.model');


exports.findAll = function (req, res) {
    DoctorEducation.findAll(function (err, doctorEducation) {
        if (err)
            res.send(err);
        res.send(doctorEducation);
    });
};

exports.findByDoctorId = function (req, res) {
    DoctorEducation.findByDoctorId(req.params.doctor_id, function (err, doctorEducation) {
        if (err)
            res.send(err);
        res.send(doctorEducation);
    });
};

exports.create = function (req, res) {
    const newDoctorEducation = new DoctorEducation(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        DoctorEducation.create(newDoctorEducation, function (err, doctorEducation) {
            if (err)
                res.send(err);
            res.status(200).send({...req.body});
        });
    }
};

exports.findById = function (req, res) {
    DoctorEducation.findById(req.params.doctor_education_id, function (err, doctorEducation) {
        if (err)
            res.send(err);
        res.json(doctorEducation);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        DoctorEducation.update(req.params.doctor_education_id, new DoctorEducation(req.body), function (err, doctorEducation) {
            if (err)
                res.send(err);
            res.status(200).send({ ...req.body });
        });
    }
};

exports.delete = function (req, res) {
    DoctorEducation.delete(req.params.doctor_education_id, function (err, doctorEducation) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Doctor Education successfully deleted' });
    });
};