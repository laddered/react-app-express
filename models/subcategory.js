require('./../config/express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = new Schema({
    subcategoryName: { type: String, required: true},
    categoryName: { type: String, required: true}
});

var Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;