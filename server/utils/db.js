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
        name: {
            type: String,
            unique: true,
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
        }
    });

    User = mongoose.model('User', userSchema);

})

module.exports = {
    register_user: (new_email, new_user, new_pass) => {
      console.log(new_email);
      console.log(new_pass);
        return new Promise((resolve, reject) => {
            //console.log(`Email: ${new_email}, User: ${new_user}, Pass: ${new_pass}`)
            User.where({ email: new_email }).findOne((err, user) => {
                if (err) {
                    //console.error(err);
                    reject(false);
                }
                else {
                    if (user == null) {
                        bcrypt.hash(new_pass, 10).then((hash) => {
                            var user = new User({
                                name: new_user,
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
                        console.log(user_password);
                        console.log(user.password);
                        bcrypt.compare(user_password, user.password).then((result) => {
                            if (result) {
                                const date = (new Date()).getDate()
                                data = {
                                    name: user.name,
                                    email: user.email,
                                    token: jwt.sign({ sub: (user._id + date + Math.random().toString())}, config.secret),
                                    id: user._id
                                }
                                console.log("worked")
                                resolve(data);
                            }
                            else {
                                console.log("fuicked")
                                resolve(false);
                            }
                        });
                    } else {
                      console.log("super fucked")
                        resolve(false)
                    }
                }
            });
        });
    }
}
