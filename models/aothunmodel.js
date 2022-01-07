const mongoose = require('./dbConnect');

// Model
var aothunSchema = mongoose.Schema({
    ten: String,
    mota: String,
    thuonghieu: String,
    size: String,
    mausac: String,
    masanpham: String,
    /* size: [String],
    mausac: [String], */
    gia: Number,
    soluong: Number,
    imgurl: [String]
    },{collection : 'aothuns'})
    
var aothunModel = mongoose.model('aothunModel',aothunSchema)
/*aothunModel.create({
    ten: "Ao10",
    mota: "String",
    thuonghieu: "String",
    size: "S", //S, M. L
    mausac: "Red", //đen trắng..
    gia: 123,
    productCode: 123
})
.then(data=>{
    console.log(25,data);
})
.catch(err=>{
    console.log(28,err);
})
aothunModel.create({
    ten: "Ao9",
    mota: "String",
    thuonghieu: "String",
    size: "S", //S, M. L
    mausac: "Blue", //đen trắng..
    gia: 345,
    productCode: 123
})
.then(data=>{
    console.log(40,data);
})
.catch(err=>{
    console.log(43,err);
})
aothunModel.create({
    ten: "Ao3",
    mota: "String",
    thuonghieu: "String",
    size: "S", //S, M. L
    mausac: "Black", //đen trắng..
    gia: 456,
    productCode: 456
})
.then(data=>{
    console.log(55,data);
})
.catch(err=>{
    console.log(58,err);
})*/


module.exports = aothunModel;