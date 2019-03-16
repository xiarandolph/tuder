const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const config = require('../config.json');
const jwt = require('jsonwebtoken');

/* init */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

/* models */
var User;

db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log("Connected to DB!");

    var userSchema = new mongoose.Schema({
        first: {
            type: String,
            required: true,
            trim: true
        },

        last: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        school: {
            type: String,
            required: true,
        },

        learn_courses: {
            type: Array,
            required: false
        },

        teach_courses: {
            type: Array,
            required: false
        }
    });

    User = mongoose.model('User', userSchema);

});

/* exports */
module.exports = {
    register_user: (new_email, new_first, new_last, new_pass) => {
        return new Promise((resolve, reject) => {
            User.where({ email: new_email }).findOne((err, user) => {
                if (err) {
                    //console.error(err);
                    reject(false);
                }
                else {
                    if (user == null) {
                        bcrypt.hash(new_pass, 10).then((hash) => {
                            var user = new User({
                                first: new_first,
                                last: new_last,
                                password: hash,
                                email: new_email
                            });

                            user.save((err, user) => {
                                if (err) {
                                    //console.error(err);
                                    resolve(false);
                                }
                            });
                        });

                        resolve(true);
                    }
                    else {
                        console.log(`${new_email} already registered!`);
                        resolve(false);
                    }
                }
            });
        })
    },
    login_user: (user_email, user_password) => {
        return new Promise((resolve, reject) => {
            User.where({ email: user_email }).findOne((err, user) => {
                if (err) reject(err);
                else {
                    if (user != null) {
                        // user exists, compare passwords
                        bcrypt.compare(user_password, user.password).then((result) => {
                            if (result) {
                                const date = (new Date()).getDate()
                                data = {
                                    name: user.name,
                                    email: user.email,
                                    token: jwt.sign({ sub: (user._id + date + Math.random().toString())}, config.secret),
                                    id: user._id
                                }
                                resolve(data);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    } else {
                        // user does not exist
                        resolve(false)
                    }
                }
            });
        });
    }
}
