const mongoose = require('./dbConnect');
const aothunModel = require('./aothunmodel')
const giohangSchema = mongoose.Schema({
    khachhangID: String,
    donhang: [{
        aothunID: {
            type: String,
            ref: 'aothuns'
        }, //bao gồm màu, kiểu, loại, size, giá
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
    const index = cart.donhang.findIndex(item => {
        
        return item.aothunID == object.aothunID
    })
    //nếu tìm thấy
    if(index !== -1) {
        cart.donhang[index].soluong += object.soluong
    }else {
        cart.donhang = cart.donhang.concat(object)
    }
    const tongTien = cart.tongtien ? cart.tongtien : 0
    cart.tongtien = tongTien + object.gia*object.soluong
    await cart.save()
    return index
}
giohangSchema.methods.addByOne = async function(aothunID) { // aothunID chính là params :id
    const cart = this
// đối tượng donhang là 1 mảng nên dùng vòng lặp
   const addedItem = cart.donhang.find(item => {
        return item.aothunID = aothunID
    })
   const gia = addedItem.gia
    addedItem.soluong ++
    cart.tongtien += gia
    await cart.save()
    return cart.donhang
}
giohangSchema.methods.reduceByOne = async function(aothunID) {
    const cart = this
// đối tượng donhang là 1 mảng nên dùng vòng lặp
   const reducedItem = cart.donhang.find(item => {
        return item.aothunID = aothunID
    })
    const gia = reducedItem.gia
    reducedItem.soluong --
    cart.tongtien -= gia
    await cart.save()
    return cart.donhang
}
giohangSchema.methods.removeItem = async function(aothunID) {
    const cart = this
    const index = cart.donhang.findIndex(item => {
        return item.aothunID == aothunID
    })
    const gia = cart.donhang[index].gia
    const soluong = cart.donhang[index].soluong
   cart.donhang.splice(index, 1)
   cart.tongtien -= gia * soluong
   await cart.save()
   return cart
}

const giohangModel = mongoose.model('giohangModel', giohangSchema)
module.exports = giohangModel

