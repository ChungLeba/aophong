var express = require('express');
var router = express.Router();
var path = require('path');
var aothunModel = require('../models/aothunmodel')
//BODYPASER
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//CRDU
//1.TRUNG TAM QUAN LY
router.get('/', function(req,res,next){
    //res.send("Trang tổng quan")
    //res.sendFile(path.join(__dirname, '../views/adminlte/index.html'))
    res.render("./adminlte/index.html",{admin:"Administrator"})
})
//2.SAN PHAM
//2.1 QUAN LY SAN PHAM
router.get('/quanlysanpham', function(req,res,next){
    //res.send("Trang tổng quan san pham")
    //res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/1quanlysanpham.html'))
    aothunModel.find()
    .limit(100)
    .then(data=>{
        console.log(data.length)
        res.render("./adminlte/pages/1.sanpham/1quanlysanpham.html", {data:data})
    })
    
})

//2.2 XEM CHI TIẾT SẢN PHẨM
router.get('/sp/:id', function(req,res,next){
    console.log(req.params.id)
    aothunModel.findById({_id: req.params.id})
    .then(data=>{
        console.log(data)
        res.render("./adminlte/pages/1.sanpham/5.xemsanpham.html", {data:data})
    })
    
})


//2.3 THEM SAN PHAM
router.get('/themsanpham', function(req,res,next){
    //res.send("Trang tổng quan san pham")
    //res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/2.themsanpham.html'))
    res.render("./adminlte/pages/1.sanpham/2.themsanpham.html")
})
router.post('/themsanpham',urlencodedParser, function(req,res,next){
    console.log(req.body)
    aothunModel.create(
        {
        ten: req.body.ten,
        mota: req.body.mota,
        thuonghieu: req.body.thuonghieu,
        size: req.body.size,
        mausac: req.body.mausac,
        gia: req.body.gia,
        }
    )
    .then(data=>{
        console.log(data)
        res.send({name: data.ten})
    })
    .catch(err=>{
        console.log(err)
    })
})
//2.4 SUA SAN PHAM
router.get('/sp/edit/:id', function(req,res,next){
    console.log(req.params.id)
    aothunModel.findById({_id: req.params.id})
    .then(data=>{
        console.log(data)
        res.render("./adminlte/pages/1.sanpham/6.suasanpham.html",{data:data})
    })
})
router.put('/sp/:id',urlencodedParser, function(req,res,next){
    //console.log(req.params.id)
    //console.log(req.body)
    aothunModel.findByIdAndUpdate({_id:req.params.id},
        {
        ten: req.body.ten,
        mota: req.body.mota,
        thuonghieu: req.body.thuonghieu,
        size: req.body.size,
        mausac: req.body.mausac,
        gia: req.body.gia,
        }
    )
    .then(data=>{
        //console.log(data)
        res.send({name: data.ten})
    })
    .catch(err=>{
        console.log(err)
    })
})

//2.5 XOA SAN PHAM
router.delete('/sp/:id',urlencodedParser, function(req,res,next){
    //console.log(req.params.id)
    console.log(req.body)
    aothunModel.findByIdAndDelete({_id:req.body.id}
    )
    .then(data=>{
        console.log(data)
        res.send({name: "Đã xóa"})
    })
    .catch(err=>{
        console.log(err)
    })
})


//3.DON DAT HANG
router.get('/quanlydonhang', function(req,res,next){
    //res.send("Trang tổng quan")
    //res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/3.quanlydonhang.html'))
    res.render("./adminlte/pages/1.sanpham/3.quanlydonhang.html")

})

//4.NGUOI DUNG
router.get('/quanlynguoidung', function(req,res,next){
    //res.send("Trang tổng quan")
    //res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/4.quanlynguoidung.html'))
    res.render("./adminlte/pages/1.sanpham/4.quanlynguoidung.html")

})

module.exports = router;