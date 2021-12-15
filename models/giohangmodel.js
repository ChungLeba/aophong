const mongoose = require('./dbConnect');

const giohangSchema = mongoose.Schema({
    khachhangID: String,
    donhang: [{
        aothunID: String, //bao gồm màu, kiểu, loại, size, giá
        soluong: Number
    }]
}, {
    timestamps: true,
    collection:'giohangs'
})

const giohangModel = mongoose.model('giohangModel', giohangSchema)
module.exports = giohangModel