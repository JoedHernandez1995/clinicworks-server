const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();
app.use(cors())

// Setup server port
const port = process.env.PORT || 8080;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});
// Require user routes
const userRoutes = require("./routes/user.routes");

//Require patient routes
const patientRoutes = require("./routes/patient.routes");

//Require doctor routes
const doctorRoutes = require("./routes/doctor.routes");

//Require doctor education routes
const doctorEducationRoutes = require("./routes/doctorEducation.routes");

//Require diagnosis education routes
const diagnosis = require("./routes/diagnosis.routes");

// using as middleware
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/doctorEducation', doctorEducationRoutes);
app.use('/api/v1/diagnosis', diagnosis);
// listen for requests

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

//testing