const mongoose = require('./dbConnect');

// Model
var aothunSchema = mongoose.Schema({
    ten: String,
    mota: String,
    thuonghieu: String,
    size: [String],
    mausac: [String],
    gia: Number,
    productCode: String
    },{collection : 'aothuns'})
    
var aothunModel = mongoose.model('aothunModel',aothunSchema)


module.exports = aothunModel;