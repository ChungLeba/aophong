const mongoose = require('./dbConnect');

// Model
var aothunSchema = mongoose.Schema({
    ten: String,
    mota: String,
    thuonghieu: String,
    size: String, //S, M. L
    mausac: String, //đen trắng..
    gia: Number,
    productCode: String
    },{collection : 'aothuns'})
    
var aothunModel = mongoose.model('aothunModel',aothunSchema)


module.exports = aothunModel;