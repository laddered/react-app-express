require('./../config/express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productName: { type: String, required: true},
    productCategory: { type: String, required: true},
    productSubcategory: String,
    productPrice: { type: Number, required: true}
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;