const mongoose = require('./dbConnect');
const donhangModel = require('./donhangmodel')
const giohangModel = require('./giohangmodel')
const bcrypt = require('bcrypt')

// Model
var useSchema = mongoose.Schema({
    phanquyen: Number, //1: admin, 2: nhanvien, 3: khach hang
    email: String,
    /* matkhau: String, */
    hoten: String,
    sodienthoai: String,
    diachi: String,
    hash: String,
    salt: String
    },{collection : 'uses'})

// định nghĩa lại định dạng user trả về ở response, không nên để password
useSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.matkhau
    return userObject
}
useSchema.statics.findByCredentials = async function(email, matkhau) {
    const user = await this.findOne({ email })
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(matkhau, user.matkhau)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
    
}
useSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
useSchema.methods.generateCart = async function() {
    const user = this
    const cart = await giohangModel.create({ userID: user._id })
    return cart
}

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