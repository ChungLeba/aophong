var express = require('express');
var router = express.Router();
const donhangModel = require('../models/donhangmodel')
const giohangModel = require('../models/giohangmodel')
const aothunModel = require('../models/aothunmodel')
const useModel = require('../models/usemodel')
const auth = require('../middlewares/auth')

router.post('/order/add', auth, async(req, res) => {
    try {
// thêm đơn hàng mới vào bảng order
        const _id = req.user._id
        const data = {}
        const fields = Object.keys(req.body)
        fields.forEach(field => {
            return data[field] = req.body[field]
        })
        const order = await donhangModel.create(data)
//xóa hàng hóa đã bán trong bảng item
        data.list.forEach(async(item)=> {
        await  aothunModel.findByIdAndUpdate(item.aothunID, { $inc: { soluong: -item.soluong } })
        })
    
// xóa dữ liệu trường list trong bảng cart
        await giohangModel.findOneAndUpdate({ khachhangID: _id }, { donhang: [], tongtien: 0 })
        res.send(order)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router