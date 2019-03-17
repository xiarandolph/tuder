const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const config = require('../config.json');
const jwt = require('jsonwebtoken');

/* init */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

/* models */
var Student;
var Tutor;
var User;
var Course;

const TOPICS = ["Math", "Engineering", "Computer Science", "Science", "Humanities", "Business", "Architecture"]

db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log("Connected to DB!");

    const studentSchema = new mongoose.Schema({
        topics: [{
            type: String
        }],
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        }]
    });
    
    const tutorSchema = new mongoose.Schema({
        topics: [{
            type: String
        }],
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        }]
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
            ref: "Student",
            required: false
        },
        
        tutor_info: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tutor",
            required: false
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
    Tutor = mongoose.model('Tutor', tutorSchema);
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
                .populate({path: 'student_info', populate: { path: 'courses', select: 'title'} })
                .populate({path: 'tutor_info', populate: { path: 'courses', select: 'title'} })
                .exec((err, user) => {
                    if (err) reject(err);
                    else {
                        if (user == null) {
                            // no user with current token (suggest relog)
                            reject("Invalid token");
                        } else {
                            data = {
                                first: user.first,
                                last: user.last,
                                email: user.email,
                                student_info: user.student_info,
                                tutor_info: user.tutor_info
                            }
                            resolve(data);
                        }
                    }
                });
        });
    },
    get_all_courses: () => {
        return new Promise((resolve, reject) => {
            Course.find({}, (err, courses) => {
                if (err) reject(err);
                else {
                    var titles = []
                    for (i in courses) {
                        titles.push(courses[i]['title']);
                    }
                    resolve(titles);
                }
            }).exec();  // unknown necessary exec()? server freezes without
        });
    },
    // updates user information with given token to have data
    update_student_info: (token, data) => {
        return new Promise((resolve, reject) => {
            User.findOne({ curr_token: token}).populate('student_info').exec((err, user) => {
                if (err) reject(err);
                else {
                    if (user == null) {
                        // no user with current token (suggest relog)
                        reject("Invalid token");
                    } else {
                        // create student_info model
                        var student_exists = new Promise((resolve_student, reject_student) => {
                            //console.log(user);
                            if (!user.student_info) {
                                const student = new Student({
                                    topics: [],
                                    courses: []
                                });
                                student.save((err, student) => {
                                    if (err) {
                                        reject_student(err);
                                        return;
                                    }
                                });
                                // save ref to the student
                                user.student_info = student._id;
                                
                                user.save((err, user) => {
                                    if (err) reject_student(err);
                                    else resolve_student(true);
                                });
                            }
                            else resolve_student(true);
                        });
                        // once student_info model has been created for the user
                        student_exists.then(() => {
                            // populate student_info
                            var promise = User.findOne({ curr_token: token}).populate('student_info').exec();
                            promise.then((user) => {
                                // update courses
                                if ('courses' in data) {
                                    var find_courses = Course.find({ title: { $in: data['courses']}}, '_id').exec()
                                    find_courses.then((courses) => {
                                        // get just the ids
                                        var ids = []
                                        for (i in courses) {
                                            ids.push(courses[i]['_id']);
                                        }
                                        return new Promise((res) => { res(ids); });
                                    }).then((ids) => {
                                        // updates courses array to be ids
                                        user.student_info.update( { courses: ids } ).exec();
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                }
                            }).then((res) => {
                                return User.findOne({ curr_token: token}).populate('student_info').exec();
                            }).then((user) => {
                                // update topics
                                if ('topics' in data) {
                                    var topics = []
                                    for (i in data['topics']) {
                                        if (TOPICS.includes(data['topics'][i]))
                                            topics.push(data['topics'][i]);
                                    }
                                    // update topics list
                                    user.student_info.update( { topics: [] } ).exec()
                                    .then((res) => {
                                        // add to topics set
                                        user.student_info.update(
                                            { $addToSet: { topics: { $each: topics} } }
                                        ).exec()
                                        .then((res) => {
                                            resolve(true);
                                        });
                                    });
                                }
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch(err => {
                            reject(err);
                        })
                    }
                }
            });
        });
    },
    // updates user information with given token to have data
    update_tutor_info: (token, data) => {
        return new Promise((resolve, reject) => {
            User.findOne({ curr_token: token}).populate('tutor_info').exec((err, user) => {
                if (err) reject(err);
                else {
                    if (user == null) {
                        // no user with current token (suggest relog)
                        reject("Invalid token");
                    } else {
                        // create tutor_info model
                        var tutor_exists = new Promise((resolve_tutor, reject_tutor) => {
                            //console.log(user);
                            if (!user.tutor_info) {
                                const tutor = new Tutor({
                                    topics: [],
                                    courses: []
                                });
                                tutor.save((err, tutor) => {
                                    if (err) {
                                        reject_tutor(err);
                                        return;
                                    }
                                });
                                // save ref to the student
                                user.tutor_info = tutor._id;
                                
                                user.save((err, user) => {
                                    if (err) reject_tutor(err);
                                    else resolve_tutor(true);
                                });
                            }
                            else resolve_tutor(true);
                        });
                        // once tutor_info model has been created for the user
                        tutor_exists.then(() => {
                            // populate tutor_info
                            var promise = User.findOne({ curr_token: token}).populate('tutor_info').exec();
                            promise.then((user) => {
                                console.log(user);
                                // update courses
                                if ('courses' in data) {
                                    var find_courses = Course.find({ title: { $in: data['courses']}}, '_id').exec()
                                    find_courses.then((courses) => {
                                        // get just the ids
                                        var ids = []
                                        for (i in courses) {
                                            ids.push(courses[i]['_id']);
                                        }
                                        return new Promise((res) => { res(ids); });
                                    }).then((ids) => {
                                        // updates courses array to be ids
                                        user.tutor_info.update( { courses: ids } ).exec();
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                }
                            }).then((res) => {
                                return User.findOne({ curr_token: token}).populate('tutor_info').exec();
                            }).then((user) => {
                                // update topics
                                if ('topics' in data) {
                                    var topics = []
                                    for (i in data['topics']) {
                                        if (TOPICS.includes(data['topics'][i]))
                                            topics.push(data['topics'][i]);
                                    }
                                    // update topics list
                                    user.tutor_info.update( { topics: [] } ).exec()
                                    .then((res) => {
                                        // add to topics set
                                        user.tutor_info.update(
                                            { $addToSet: { topics: { $each: topics} } }
                                        ).exec()
                                        .then((res) => {
                                            resolve(true);
                                        });
                                    });
                                }
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch(err => {
                            reject(err);
                        })
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
