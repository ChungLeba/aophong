const mongoose = require('./dbConnect');
const donhangModel = require('./donhangmodel')
const giohangModel = require('./giohangmodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Model
var useSchema = mongoose.Schema({
    phanquyen: Number, //1: admin, 2: nhanvien, 3: khach hang
    email: String,
    matkhau: String,
    hoten: String,
    sodienthoai: String,
    diachi: String,
    tokens: [{
        token: String
    }],
    hash: String,
    salt: String,
    lasttoken: String
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
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.LOGINJWT)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
useSchema.methods.generateCart = async function() {
    const user = this
    const cart = await giohangModel.create({ khachhangID: user._id })
    return cart
}

useSchema.pre('save', async function(next) {
    const user = this
//đk trả về true khi tài khoản lập mới hoặc đổi req.body có field là "password" mà k cần khác mật khẩu cũ
    if(user.isModified('matkhau')) {
        user.matkhau = await bcrypt.hash(user.matkhau, 8)
    }
    next()
})
var useModel = mongoose.model('useModel',useSchema)

module.exports = useModel;