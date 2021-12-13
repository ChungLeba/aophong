const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nodemy:nodemyabc@cluster0.oihzb.mongodb.net/aophongstore?retryWrites=true&w=majority');

// Model
var donhangSchema = new mongoose.Schema({
    donhang: [{
        aothunID: String, 
        soluong: Number,
    }],
    khachhangID: String,
    tennguoinhan: String,
    sdtnguoinhan: String,
    diachinhanhang: String,
    cachthanhtoan: String,
    trangthaidonhang: String
    },{collection : 'donhangs'})
    
var donhangModel = mongoose.model('donhangModel',donhangSchema)

//CREATE DATA
/* donhangModel.create({
    donhang: [{
        aothunID: "61b6fb78ab89b9216fb4cd9e", 
        soluong: 10
    }],
    khachhangID: "61b707fd0a9667639eb8968e",
    tennguoinhan: "LE BA CHUNG",
    sdtnguoinhan: "0989 527 911",
    diachinhanhang: "77 Le Van Thinh",
    cachthanhtoan: "COD",
    trangthaidonhang: "Chờ shop duyệt"
})
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
}) */

module.exports = donhangModel;