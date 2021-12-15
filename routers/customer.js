var express = require('express');
var router = express.Router();
var path = require('path')
const useModel = require('../models/usemodel')
// const donhangModel = require('../models/donhangmodel')

//1.TRANG CHU
router.get('/home', function(req,res,next){
    res.send("Trang chủ")
})
//2.CHI TIET
router.get('/ao-phong/:id', function(req,res,next){
    res.send("Trang chi tiet")
})
router.post('/', async(req, res) => {
    try {
          user = new UserModel(req.body)
         await user.save()
         await user.generateAuthToken()
         await user.generateCart()
         res.status(201).send(user)
    } catch (error) {
         res.status(400).send(error)
    }
 })
 router.post('/login', async(req, res) => {
    const user = await UserModel.findByCredentials(req.body.email, req.body.password)
    await user.generateAuthToken()
    res.send(user)
})


module.exports = router;