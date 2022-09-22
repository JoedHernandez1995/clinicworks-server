const dbConn = require('../config/db.config');

//Doctor object create
const Doctor = function (doctor) {
    this.doctor_id = doctor.doctor_id
    this.medical_college_number = doctor.medical_college_number
    this.user_id = doctor.user_id
    this.first_name = doctor.first_name
    this.middle_name = doctor.middle_name
    this.last_name = doctor.last_name
    this.dob = doctor.dob
    this.specialization = doctor.specialization
    this.address = doctor.address
    this.city = doctor.city
    this.state = doctor.state
    this.country = doctor.country
    this.phone_number = doctor.phone_number
    this.profile_picture = doctor.profile_picture
    this.clinic_name = doctor.clinic_name
    this.hospital_name = doctor.hospital_name
    this.created_at = new Date();
    this.updated_at = new Date();
};

Doctor.findByUserId = function (user_id, result) {

    const findByUserIdQuery = `SELECT U.user_Email, D.*
                                FROM doctors D
                                LEFT JOIN users U on D.user_id = U.user_id
                                WHERE D.user_id = ?`;

    dbConn.query(findByUserIdQuery, user_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


Doctor.create = function (newDoctor, result) {
    dbConn.query("INSERT INTO doctors set ?", newDoctor, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

Doctor.findById = function (doctor_id, result) {
    dbConn.query("Select * from doctors where doctor_id = ? ", doctor_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Doctor.findAll = function (result) {
    dbConn.query("Select * from doctors", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


Doctor.update = function (doctor_id, doctor, result) {

    const updateQuery = `UPDATE doctors
                         SET first_name=?, middle_name=?, last_name=?, dob=?, specialization=?, address=?, city=?, state=?, country=?, phone_number=?, profile_picture=?, clinic_name=?, hospital_name=? 
                         WHERE doctor_id = ?
    
        `
    dbConn.query(updateQuery, [
        doctor.first_name, 
        doctor.middle_name, 
        doctor.last_name, 
        doctor.dob, 
        doctor.specialization, 
        doctor.address, 
        doctor.city, 
        doctor.state, 
        doctor.country, 
        doctor.phone_number, 
        doctor.profile_picture, 
        doctor.clinic_name, 
        doctor.hospital_name, 
        doctor_id
    ], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Doctor.delete = function (doctor_id, result) {
    dbConn.query("DELETE FROM doctors WHERE doctor_id = ?", [doctor_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Doctor;