var express = require('express');
var router = express.Router();
var path = require('path');


//CRDU
//1.TRUNG TAM QUAN LY
router.get('/', function(req,res,next){
    //res.send("Trang tổng quan")
    res.sendFile(path.join(__dirname, '../views/adminlte/index.html'))
})
//2.SAN PHAM
//2.1 QUAN LY SAN PHAM
router.get('/quanlysanpham', function(req,res,next){
    //res.send("Trang tổng quan san pham")
    res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/1quanlysanpham.html'))
})

//2.2 THEM SAN PHAM
router.get('/themsanpham', function(req,res,next){
    //res.send("Trang tổng quan san pham")
    res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/2.themsanpham.html'))
})



//3.DON DAT HANG
router.get('/quanlydonhang', function(req,res,next){
    //res.send("Trang tổng quan")
    res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/3.quanlydonhang.html'))
})

//4.NGUOI DUNG
router.get('/quanlynguoidung', function(req,res,next){
    //res.send("Trang tổng quan")
    res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/4.quanlynguoidung.html'))
})

module.exports = router;