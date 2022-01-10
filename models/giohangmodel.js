const mongoose = require('./dbConnect');

const giohangSchema = mongoose.Schema({
    khachhangID: String,
    donhang: [{
        aothunID: String, //bao gồm màu, kiểu, loại, size, giá
        gia: Number,
        soluong: Number
    }],
    tongtien: Number,
}, {
    timestamps: true,
    collection:'giohangs'
})
giohangSchema.methods.addItem = async function (object) { //khi gọi hàm thì object chính là req.body
    const cart = this
    const index = cart.list.findIndex(item => {
        
        return item.aothunID == object.aothunID
    })
    //nếu tìm thấy
    if(index !== -1) {
        cart.list[index].soluong += object.soluong
    }else {
        cart.list = cart.list.concat(object)
    }
    cart.tongtien = cart.tongtien + object.gia*object.soluong
    await cart.save()
    return index
}
giohangSchema.methods.addByOne = async function(aothunID) { // aothunID chính là params :id
    const cart = this
// đối tượng list là 1 mảng nên dùng vòng lặp
   const addedItem = cart.list.find(item => {
        return item.aothunID = aothunID
    })
   const gia = addedItem.gia
    addedItem.soluong ++
    cart.tongtien += gia
    await cart.save()
    return cart.list
}
giohangSchema.methods.reduceByOne = async function(aothunID) {
    const cart = this
// đối tượng list là 1 mảng nên dùng vòng lặp
   const reducedItem = cart.list.find(item => {
        return item.aothunID = aothunID
    })
    const gia = reducedItem.gia
    reducedItem.soluong --
    cart.tongtien -= gia
    await cart.save()
    return cart.list
}
giohangSchema.methods.removeItem = async function(aothunID) {
    const cart = this
    const index = cart.list.findIndex(item => {
        return item.aothunID == aothunID
    })
    const gia = cart.list[index].gia
    const soluong = cart.list[index].soluong
   cart.list.splice(index, 1)
   cart.tongtien -= gia * soluong
   await cart.save()
   return cart
}

const giohangModel = mongoose.model('giohangModel', giohangSchema)
module.exports = giohangModel
// giohangModel.find()
// .then(data=>{console.log(data);})
// .catch(err=>{console.log(err);})