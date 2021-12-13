const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nodemy:nodemyabc@cluster0.oihzb.mongodb.net/aophongstore?retryWrites=true&w=majority');


// Model
var aothunSchema = new mongoose.Schema({
    ten: String,
    mota: String,
    thuonghieu: String,
    size: [String],
    mausac: [String],
    gia: Number
    },{collection : 'aothuns'})
    
var aothunModel = mongoose.model('aothunModel',aothunSchema)

//CREATE DATA
/* for (let index = 0; index < 10; index++) {
    var tenao = "ÁO THUN NAM NGẮN TAY PUMA "+index
    aothunModel.create({
        ten: tenao,
        mota: "Hàng Chính Hãng - Chất Lượng Cao",
        thuonghieu: "SMART",
        size: ["S"],
        mausac: ["Trắng","Vàng"],
        gia: 200000
    })
    .then(data=>{
        console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })
} */


module.exports = aothunModel;