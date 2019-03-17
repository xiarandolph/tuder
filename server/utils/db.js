const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const config = require('../config.json');
const jwt = require('jsonwebtoken');

/* init */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

/* models */
var Student;
var User;
var Course;

db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log("Connected to DB!");

    const studentSchema = new mongoose.Schema({
        test: {
            type: String,
            required: false
        }
    });

    const userSchema = new mongoose.Schema({
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
        // store token for accessing user based on token
        curr_token: {
            type: String,
            unique: true,
            required: false
        },
        
        student_info: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    });

    const courseSchema = new mongoose.Schema({
        title: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }
    });

    Student = mongoose.model('Student', studentSchema);
    User = mongoose.model('User', userSchema);
    Course = mongoose.model('Course', courseSchema);
    
    // store courses into the database
    const courses = require('../../python/out.json')['courses'];
    for (let i = 0; i < courses.length; i++) {
        const course_title = courses[i];
        const course = new Course({
            title: course_title
        });
        course.save((err, course) => {
            // if err,course already exists
            //if (err) console.error(err);
        });
    }
});

/* exports */
module.exports = {
    // creates user if not already existing
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
                            const user = new User({
                                first: new_first,
                                last: new_last,
                                password: hash,
                                email: new_email,
                                curr_token: ""
                            });

                            user.save((err, user) => {
                                if (err) {
                                    //console.error(err);
                                    resolve(false);
                                }
                                console.log(`${new_email} registered!`);
                            });
                        });

                        resolve(true);
                    }
                    else {
                        console.log(`${new_email} already registered!`);
                        resolve(false)
                    }
                }
            });
        })
    },
    // logins in given a email and password, returns token
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
                                const token = jwt.sign({ sub: (user._id + date + Math.random().toString())}, config.secret)
                                user.curr_token = token;
                                // update the current token
                                user.save((err, user) => {
                                    if (err) {
                                        reject(err);
                                    }
                                });
                                
                                resolve(token);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    } else {
                        // user does not exist
                        resolve(false);
                    }
                }
            });
        });
    },
    // returns user information from a token
    get_user_info: (token) => {
        return new Promise((resolve, reject) => {
            User.findOne({ curr_token: token})
                .populate('student_info').exec((err, user) => {
                    if (err) reject(err);
                    else {
                        if (user == null) {
                            // no user with current token (suggest relog)
                            resolve(false);
                        } else {
                            data = {
                                first: user.first,
                                last: user.last,
                                email: user.email,
                                student_info: user.student_info
                            }
                            resolve(data);
                        }
                    }
                });
        });
    },
    get_all_courses: () => {
        return new Promise((resolve, reject) => {
            Course.find({}, (err, docs) => {
                if (err) reject(err);
                else resolve(docs);
            }).exec();  // unknown necessary exec()? server freezes without
        });
    },
    // updates user information with given token to have data
    update_student_info: (token, data) => {
        return new Promise((resolve, reject) => {
            User.findOne({ curr_token: token}, (err, user) => {
                if (err) reject(err);
                else {
                    if (user == null) {
                        // no user with current token (suggest relog)
                        reject("Invalid token");
                    } else {
                        // create student_info model
                        if (!user.student_info) {
                            const student = new Student({
                                test: "random string"
                            });
                            student.save((err, student) => {
                                if (err) console.log(err);
                            });
                            // save ref to the student
                            user.student_info = student._id;
                        }
                        
                        // get the user again (NECESSARY!! can't use user)
                        User.findOne({ curr_token: token}).populate('student_info')
                            .exec((err, user) => {
                                console.log(user);
                                // update and save the new student info
                                user.student_info['test'] = 'new string';
                                user.student_info.save((err, user) => {
                                    if (err) console.log(err);
                                });
                            });

                        user.save((err, user) => {
                            if (err) console.log(err);
                        });
                        
                        resolve(true);
                    }
                }
            });
        });
    },
    // returns all registered users, temporary debugging
    get_all_users: () => {
        return new Promise((resolve, reject) => {
            User.find({}, (err, docs) => {
                if (err) reject(err);
                else resolve(docs);
            }).exec();  // unknown necessary exec()? server freezes without
        });
    }
}
