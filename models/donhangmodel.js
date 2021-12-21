const mongoose = require('./dbConnect');

// Model
var donhangSchema = mongoose.Schema({
    donhang: [{
        aothunID: String, 
        gia: Number,
        soluong: Number,
    }],
    khachhangID: String,
    tennguoinhan: String,
    sdtnguoinhan: String,
    diachinhanhang: String,
    cachthanhtoan: String,
    trangthaidonhang: String
    },{timestamps: true, collection : 'donhangs'})


var donhangModel = mongoose.model('donhangModel',donhangSchema)


module.exports = donhangModel;