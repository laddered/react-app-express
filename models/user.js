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
    updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;