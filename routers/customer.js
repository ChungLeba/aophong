var express = require('express');
var router = express.Router();
var path = require('path')
const useModel = require('../models/usemodel')
const checkLogin = require('../middlewares/checkLogin')

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
          user = new useModel(req.body)
         await user.save()
         await user.generateCart()
         res.status(201).send(user)
    } catch (error) {
         res.status(400).send(error)
    }
 })
 router.post('/login', async(req, res) => {
    try {
          const user = await useModel.findByCredentials(req.body.email, req.body.matkhau)
          const token = await user.generateAuthToken()
          res.json({mess: 'Dang nhap thanh cong', status: 200, userToken: token})
          //setCookie viết ở JQuery
    } catch (error) {
         res.send(error)
    }
    
})
router.post('/logout', checkLogin, async(req, res) => {
     try {
          await blackListModel.create({ token: req.cookies.userToken })
      } catch (error) {
           res.json('Loi server')
         }
})


module.exports = router;