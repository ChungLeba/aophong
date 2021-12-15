var express = require('express');
var router = express.Router();
const donhangModel = require('../models/donhangmodel')
const giohangModel = require('../models/giohangmodel')
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

// thêm vào trường order của bảng user
    //    const user = await UserModel.findById(_id)
    //    user.orders = user.orders.concat(order._id)
    //    await user.save()
// xóa dữ liệu trường list trong bảng cart
        await giohangModel.findOneAndUpdate({ khachhangID: _id }, { donhang: [] })
        res.send(order)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router