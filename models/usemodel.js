const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nodemy:nodemyabc@cluster0.oihzb.mongodb.net/aophongstore?retryWrites=true&w=majority');

// Model
var useSchema = new mongoose.Schema({
    phanquyen: Number, //1: admin, 2: nhanvien, 3: khach hang
    email: String,
    matkhau: String,
    hoten: String,
    sodienthoai: String,
    diachi: String,
    },{collection : 'uses'})
    
var useModel = mongoose.model('useModel',useSchema)

//CREATE DATA
/* useModel.create({
    phanquyen: 3,
    email: 'khachhang1@gmail.com',
    matkhau: '123456',
    hoten: "ANH HAI LUA",
    sodienthoai: "0989 527 911",
    diachi: "77 Le Van Thinh, Hoa Minh, Lien Chieu, Da Nang",
})
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})
 */

module.exports = useModel;