const mongoose = require('./dbConnect');

// Model
var donhangSchema = new mongoose.Schema({
    donhang: [{
        aothunID: String, 
        soluong: Number,
        gia: Number,
    }],
    khachhangID: String,
    tennguoinhan: String,
    sdtnguoinhan: String,
    diachinhanhang: String,
    cachthanhtoan: String,
    trangthaidonhang: String
    },{collection : 'donhangs'})
    
var donhangModel = mongoose.model('donhangModel',donhangSchema)

module.exports = donhangModel;