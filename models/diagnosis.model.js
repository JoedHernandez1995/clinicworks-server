const dbConn = require('../config/db.config');
const { uuid } = require('uuidv4');


//DoctorEduaction object create
const Diagnosis = function (diagnosis) {
    this.diagnosis_id = uuid();
    this.patient_id = diagnosis.patient_id;
    this.doctor_diagnosis_id = diagnosis.doctor_diagnosis_id;
    this.diagnosis_date = diagnosis.diagnosis_date;
    this.disease_name = diagnosis.disease_name;
    this.diagnosis_description = diagnosis.diagnosis_description;
    this.weight = diagnosis.weight;
    this.cardiac_frequency = diagnosis.cardiac_frequency;
    this.pulse = diagnosis.pulse;
    this.temperature = diagnosis.temperature;
    this.respiratory_frequency = diagnosis.respiratory_frequency;
    this.blood_pressure = diagnosis.blood_pressure;
    this.drugs_prescribed = diagnosis.drugs_prescribed;
    this.lab_exams_requested = diagnosis.lab_exams_requested;
    this.imaging_tests_requested = diagnosis.imaging_tests_requested;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Diagnosis.findByPatientId = function (patient_id, result) {

    const findByPatientIdQuery = `SELECT *
                                FROM diagnosis 
                                WHERE patient_id = ?`;

    dbConn.query(findByPatientIdQuery, patient_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Diagnosis.findByDoctorId = function (doctor_diagnosis_id, result) {

    const findByDoctorIdQuery = `SELECT *
                                FROM diagnosis 
                                WHERE doctor_diagnosis_id = ?`;

    dbConn.query(findByDoctorIdQuery, doctor_diagnosis_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Diagnosis.findByPatientAndDoctorId = function (patient_id,doctor_diagnosis_id, result) {

    const findByPatientAndDoctorIdQuery = ` SELECT D.*
                                            FROM diagnosis D
                                            JOIN patients P ON D.patient_id = P.patient_id
                                            JOIN doctors DR ON D.doctor_diagnosis_id = DR.doctor_id
                                            WHERE D.patient_id = ? AND D.doctor_diagnosis_id = ?`;

    dbConn.query(findByPatientAndDoctorIdQuery, [patient_id, doctor_diagnosis_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};



Diagnosis.create = function (newDiagnosis, result) {
    dbConn.query("INSERT INTO diagnosis set ?", newDiagnosis, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Diagnosis.findById = function (diagnosis_id, result) {
    console.log({diagnosis_id});
    dbConn.query("Select * from diagnosis where diagnosis_id = ?", diagnosis_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Diagnosis.findAll = function (result) {
    dbConn.query("Select * from diagnosis", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


Diagnosis.update = function (diagnosis_id, diagnosis, result) {
    const updateQuery = `UPDATE diagnosis
                         SET diagnosis_date=?, disease_name=?, diagnosis_description=?, weight=?, cardiac_frequency=?,pulse=?,temperature=?,respiratory_frequency=?,blood_pressure=?,drugs_prescriped=?,lab_exams_requested=?,imaging_tests_requested=?
                         WHERE diagnosis_id = ?`
    dbConn.query(updateQuery, [
        diagnosis.diagnosis_date,
        diagnosis.disease_name,
        diagnosis.diagnosis_description,
        diagnosis.weight,
        diagnosis.cardiac_frequency,
        diagnosis.pulse,
        diagnosis.temperature,
        diagnosis.respiratory_frequency,
        diagnosis.blood_pressure,
        diagnosis.drugs_prescribed,
        diagnosis.lab_exams_requested,
        diagnosis.imaging_tests_requested,
        diagnosis_id
    ], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Diagnosis.delete = function (diagnosis_id, result) {
    dbConn.query("DELETE FROM diagnosis WHERE diagnosis_id = ?", [diagnosis_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = Diagnosis;