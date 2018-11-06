require('./../config/express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    age: Number,
    gender: String,
    created_at: Date,
    updated_at: Date,
    isAdmin: Boolean
});

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

var User = mongoose.model('User', userSchema);

module.exports = User;