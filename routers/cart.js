var express = require('express');
var router = express.Router();
const donhangModel = require('../models/donhangmodel')
const giohangModel = require('../models/giohangmodel')
const checkLogin = require('../middlewares/checkLogin')

router.post('/add-to-cart', checkLogin, async(req, res) => {
    try {
//req.body là object gồm aothunID và soluong, gia
       const cart = await giohangModel.findOne({ khachhangID: req.user._id })
// thêm sp vào trường donhang của bảng giohang và cập nhật tổng tiền;  xem chi tiết function trong model
        const item = await cart.addItem(req.body)
        res.status(201).send(cart)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.put('/add-by-one/:id', checkLogin, async(req, res) => {
    try {
         const cart = await giohangModel.findOne({ khachhangID: req.user._id })
         const addedItem = await cart.addByOne(req.params.id)
         res.status(201).send(addedItem)
    } catch (error) {
        res.status(500).send(error)
    }
 })
 router.put('/reduce/:id', checkLogin, async(req, res) => {
    try {
         const cart = await giohangModel.findOne({ khachhangID: req.user._id })
         const reduceItem = await cart.reduceByOne(req.params.id)
         res.status(201).send(reduceItem)
    } catch (error) {
     res.status(500).send(error)
    }
 })
router.get('/', checkLogin, async(req, res) => {
   try {
        const cart = await giohangModel.findOne({ khachhangID: req.user._id })
        res.status(201).send(cart)
   } catch (error) {
        res.status(500).send(error)
   }
})


module.exports = router