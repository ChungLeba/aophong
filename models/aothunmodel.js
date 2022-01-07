const mongoose = require('./dbConnect');
// Model
var aothunSchema = new mongoose.Schema({
    ten: String,
    mota: String,
    thuonghieu: String,
    size: String,
    mausac: String,
    masanpham: String,
    gia: Number,
    soluong: Number,
    imgurl: [String]
    },{collection : 'aothuns'})
    
var aothunModel = mongoose.model('aothunModel',aothunSchema)

module.exports = aothunModel;