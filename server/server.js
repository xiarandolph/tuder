const config = require('./config');

const express = require('express');
const app = express();
const DB = require('./utils/db');
const path = require('path');
const bodyParser = require('body-parser');

const hmac = require('crypto-js/hmac-md5');
const enc_utf8 = require('crypto-js/enc-utf8');
const jwt = require('./utils/jwt');
const error_handler = require('./utils/error-handler');

app.use(express.static('public'));
app.use(bodyParser.urlencoded());

app.use(jwt());
app.use(error_handler);

// Add headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// POST request to register a new user
app.post('/register', (req, res) => {
     DB.register_user(req.body['email'], req.body['first'], req.body['last'], req.body['pass'])
        .then(data => res.send(data))
        .catch(err => {
            // email already exists
            console.error(err);
            res.send(false);
        });
});

app.post('/login', (req, res) => {
    DB.login_user(req.body['email'], req.body['pass'])
        .then(data => res.json(data))
        .catch(err => {
            // invalid email or password
            console.error(err);
            res.send(false);
        });
});

app.get('/get_user_info', (req, res) => {
    // authorization = ['Bearer', 'token']
    var token = req.headers.authorization.split(" ")[1];
    DB.get_user_info(token)
        .then(data => res.json(data))
        .catch(err => {
            console.error(err);
            res.send(false);
        });
});

app.get('/get_all_courses', (req, res) => {
    DB.get_all_courses()
        .then(data => res.json(data))
        .catch(err => {
            console.error(err);
            res.send(false);
        });
});

app.post('/update_student_info', (req, res) => {
    // authorization = ['Bearer', 'token']
    var token = req.headers.authorization.split(" ")[1];
    DB.update_student_info(token, req.body)
        .then(data => res.json(data))
        .catch(err => {
            console.error(err)
            res.send(false);
        });
});

app.post('/update_tutor_info', (req, res) => {
    // authorization = ['Bearer', 'token']
    var token = req.headers.authorization.split(" ")[1];
    DB.update_tutor_info(token, req.body)
        .then(data => res.json(data))
        .catch(err => {
            console.error(err)
            res.send(false);
        });
});

app.get('/get_all_users', (req, res) => {
    DB.get_all_users()
        .then(data => res.json(data))
        .catch(err => {
            console.error(err)
            res.send(false);
        });
});

const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
