"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const port = 3300;
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const moment = require("moment");
const device = require("express-device");
var nodemailer = require('nodemailer');

const userRouting = require('./modules/routes/user/user');
const fileRouting = require('./modules/routes/file/file');


console.log('Application Started');
const app = express();
exports.app = app;

app.disable('x-powered-by');
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));
app.use(compression());
app.use(device.capture({
    parseUserAgent: true
}));

app.use('/api/users', userRouting.userRouter);

app.use('/api/file', fileRouting.fileRouter);

app.get('/api/device', (req, res, next) => {
    res.json(req.device);
});

app.get('/api/sendmail', (req, res, next) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
            user: 'radu.nie@softelligence.net',
            pass: ''
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    var mailOptions = {
        from: 'radu.nie@softelligence.com',
        to: 'nie.radu@gmail.com',
        subject: 'Email trimis cu node',
        text: 'sofinteligentza!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});