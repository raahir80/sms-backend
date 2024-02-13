const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const adminRouter= require("../routes/staff/adminRoute");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); // pass incoming json data

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



//admin register
app.use("/api/v1/admins",adminRouter);

module.exports = app;