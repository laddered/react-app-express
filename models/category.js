require('./../config/express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categoryName: { type: String, required: true}
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;