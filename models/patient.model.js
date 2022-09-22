const dbConn = require('../config/db.config');

//Patient object create
const Patient = function (patient) {
    this.patient_id = patient.patient_id;
    this.patient_doctor_id = patient.patient_doctor_id;
    this.firstName = patient.firstName;
    this.lastName = patient.lastName;
    this.dob = patient.dob;
    this.bloodgroup = patient.bloodgroup;
    this.gender = patient.gender;
    this.religion = patient.religion;
    this.email = patient.email;
    this.phone = patient.phone;
    this.address = patient.address;
    this.city = patient.city;
    this.country = patient.country;
    this.past_medical_records = patient.past_medical_records;
    this.main_symptom = patient.main_symptom;
    this.hea = patient.hea;
    this.emergency_contact = patient.emergency_contact;
    this.emergency_contact_phone = patient.emergency_contact_phone;
    this.workplace = patient.workplace;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Patient.findAllByDoctorId = function (patient_doctor_id, result) {
    dbConn.query("SELECT distinct patients.* FROM patients INNER JOIN doctors ON patients.patient_doctor_id = ? ", patient_doctor_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


Patient.create = function (newPatient, result) {
    dbConn.query("INSERT INTO patients set ?", newPatient, function (err, res) {
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

Patient.findById = function (id, result) {
    dbConn.query("Select * from patients where patient_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Patient.findAll = function (result) {
    dbConn.query("Select * from patients", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('patients : ', res);
            result(null, res);
        }
    });
};


Patient.update = function (user_id, patient, result) {
    dbConn.query("UPDATE patients SET user_type=?,user_email=?,user_password=?,active=? WHERE user_id = ?", [patient.user_type, patient.user_email, patient.user_password, patient.active, user_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Patient.delete = function (id, result) {
    dbConn.query("DELETE FROM patients WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Patient;