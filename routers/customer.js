var express = require('express');
var router = express.Router();
var useModel = require('../models/usemodel')

//BODYPASER
var bodyParser = require('body-parser');
const { listIndexes } = require('../models/aothunmodel');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//1.TRANG CHU
router.get('/home', function(req,res,next){
    res.send("Trang chủ")
})
//2.CHI TIET
router.get('/ao-phong/:id', function(req,res,next){
    res.send("Trang chi tiet")
})
//3.KHACH HANG DANG KI >> XỦ LÝ BÊN ADMIN
router.get('/dangky', function(req,res,next){
    res.render("./adminlte/pages/3.use/1.reg.html",{mes:""})
})

//4.TRANG CỦA KHÁCH HÀNG
router.get('/khachhang', function(req,res,next){
    res.send("Trang của khách hàng")
})


module.exports = router;