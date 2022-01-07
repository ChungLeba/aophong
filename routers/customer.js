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
    res.send("../Home_page/Home_page.html")
})
//2.CHI TIET
router.get('/ao-phong/:id', function(req,res,next){
    res.send("../Detail_page/Detail_page.html")
})
//3.KHACH HANG DANG KI >> XỦ LÝ BÊN ADMIN
router.get('/dangky', function(req,res,next){
    res.render("./adminlte/pages/3.use/1.reg.html",{mes:""})
})

router.post('/dangky', function(req,res,next){
    
})
//4.TRANG CỦA KHÁCH HÀNG
router.get('/khachhang', function(req,res,next){
    res.send("Trang của khách hàng")
})


module.exports = router;