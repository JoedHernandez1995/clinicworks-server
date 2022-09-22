const dbConn = require('../config/db.config');
const bcrypt = require ('bcrypt');

const jwt = require("jsonwebtoken")

const jwtKey = process.env.JWT_KEY
const jwtExpirySeconds = 3600

const { uuid } = require('uuidv4');

//User object create
const User = function (user) {
    this.user_id = uuid();
    this.user_type = user.user_type;
    this.user_email = user.user_email;
    this.user_password = user.user_password;
    this.active = user.active;
    this.created_at = new Date();
    this.updated_at = new Date();
};

User.login = function(user_email, user_password, result){
    dbConn.query("SELECT * from users where user_email = ? ", user_email, async function(err, res){
        if(res){
            if(res.length > 0){
                //check password
                const validPassword = await bcrypt.compare(user_password, res[0].user_password);
                if(validPassword){ 
                    const token = jwt.sign({ 
                            user_id: res[0].user_id, 
                            user_type: res[0].user_type, 
                            user_email: res[0].user_email,
                            active: res[0].active
                        }, 
                        jwtKey, {
                            algorithm: "HS256",
                            expiresIn: jwtExpirySeconds
                        }
                    );
                    result(null, {
                        token, 
                        user_id: res[0].user_id, 
                        user_type: res[0].user_type, 
                        user_email: res[0].user_email,
                        active: res[0].active
                    });
                }else{
                    result({message: "Contrasena invalida" },null );
                };
            }else{
                result({message: `No se encontro usuario con este correo: ${user_email}`}, null);
            }
        }else{
            result({error:"Invalid Login"}, null);
        }
    });
}


User.create = function (newUser, result) {
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
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

User.findById = function (id, result) {
    dbConn.query("Select * from users where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

User.findAll = function (result) {
    dbConn.query("Select * from users", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};


User.update = function (user_id, user, result) {
    dbConn.query("UPDATE users SET user_type=?,user_email=?,user_password=?,active=? WHERE user_id = ?", [user.user_type, user.user_email, user.user_password, user.active, user_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
User.delete = function (id, result) {
    dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = User;