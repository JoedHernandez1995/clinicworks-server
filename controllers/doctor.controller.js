const Doctor = require('../models/doctor.model');


exports.findAll = function (req, res) {
    Doctor.findAll(function (err, doctor) {
        if (err)
            res.send(err);
        res.send(doctor);
    });
};

exports.findByUserId = function (req, res) {
    Doctor.findByUserId(req.params.id, function (err, doctor) {
        if (err)
            res.send(err);
        res.send(doctor);
    });
};

exports.create = function (req, res) {
    const new_doctor = new Doctor(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Doctor.create(new_doctor, function (err, doctor) {
            if (err)
                res.send(err);
            res.status(200).send({...req.body});
        });
    }
};

exports.findById = function (req, res) {
    Doctor.findById(req.params.id, function (err, doctor) {
        if (err)
            res.send(err);
        res.json(doctor);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Doctor.update(req.params.id, new Doctor(req.body), function (err, doctor) {
            if (err)
                res.send(err);
            res.status(200).send({ ...req.body });
        });
    }
};

exports.delete = function (req, res) {
    Doctor.delete(req.params.id, function (err, doctor) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Doctor successfully deleted' });
    });
};