const dbConn = require('../config/db.config');
const { uuid } = require('uuidv4');
//DoctorEduaction object create
const DoctorEducation = function (doctorEducation) {
    this.doctor_education_id = uuid();
    this.course_name = doctorEducation.course_name;
    this.graduation_year = doctorEducation.graduation_year;
    this.country = doctorEducation.country;
    this.city = doctorEducation.city;
    this.doctor_id = doctorEducation.doctor_id;
    this.school_name = doctorEducation.school_name;
    this.created_at = new Date();
    this.updated_at = new Date();
};

DoctorEducation.findByDoctorId = function (doctor_id, result) {

    const findByDoctorIdQuery = `SELECT *
                                FROM doctor_education 
                                WHERE doctor_id = ?`;

    dbConn.query(findByDoctorIdQuery, doctor_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


DoctorEducation.create = function (newDoctorEducation, result) {
    dbConn.query("INSERT INTO doctor_education set ?", newDoctorEducation, function (err, res) {
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

DoctorEducation.findById = function (doctor_education_id, result) {
    dbConn.query("Select * from doctor_education where doctor_education_id = ?", doctor_education_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

DoctorEducation.findAll = function (result) {
    dbConn.query("Select * from doctor_education", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('doctor_education : ', res);
            result(null, res);
        }
    });
};


DoctorEducation.update = function (doctor_education_id, doctorEducation, result) {
    const updateQuery = `UPDATE doctor_education
                         SET course_name=?, graduation_year=?, country=?, city=?, school_name=?
                         WHERE doctor_education_id = ?`
    dbConn.query(updateQuery, [
        doctorEducation.course_name, 
        doctorEducation.graduation_year, 
        doctorEducation.country, 
        doctorEducation.city, 
        doctorEducation.school_name,
        doctor_education_id
    ], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

DoctorEducation.delete = function (doctor_education_id, result) {
    dbConn.query("DELETE FROM doctor_education WHERE doctor_education_id = ?", [doctor_education_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = DoctorEducation;