var express = require('express');
var router = express.Router();
const donhangModel = require('../models/donhangmodel')
const giohangModel = require('../models/giohangmodel')
const auth = require('../middlewares/auth')

router.post('/cart/add', auth, async(req, res) => {
    try {
        const { aothunID, soluong } = req.body
       let cart = await giohangModel.findOne({ userID: req.user._id })
       cart.list = cart.list.concat({ aothunID, soluong })
       await cart.save()
       res.send()
      
    } catch (error) {
        res.send(error)
    }
})
router.get('/cart', auth, async(req, res) => {
    const cart = await giohangModel.findOne({ userID: req.user._id })
    res.send(cart)
})

module.exports = router