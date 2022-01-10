var express = require('express');
var router = express.Router();
var useModel = require('../models/usemodel')

//BODYPASER
var bodyParser = require('body-parser');
const { listIndexes } = require('../models/aothunmodel');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//XÁC THỰC & PHÂN QUYỀN
require('dotenv').config()
var jwt = require('jsonwebtoken');
//HASH PASS
var crypto = require("crypto")
//1.TRANG CHU
router.get('/home', function(req,res,next){
    res.send("Trang chủ")
})
//2.CHI TIET
router.get('/ao-phong/:id', function(req,res,next){
    res.send("Trang chi tiet")
})
//3.KHACH HANG DANG KI
router.get('/dangky', function(req,res,next){
    res.render("./adminlte/pages/3.use/1.reg.html",{mes:""})
})

router.post('/dangky',urlencodedParser, function(req,res,next){
    console.log(req.body)
    useModel.findOne({
        email: req.body.email
    })
    .then(data=>{
        console.log(data)
        if(data){
            res.send({err: "Email đã tồn tại"})
        } else {
            let salt = crypto.randomBytes(32).toString('hex');
            let hash = crypto.pbkdf2Sync(req.body.matkhau, salt, 2000, 64, 'sha512')
            hash = hash.toString('hex')
            //console.log(salt, hash)
            useModel.create(
                {
                    phanquyen: req.body.phanquyen,
                    email: req.body.email,
                    hoten: req.body.hoten,
                    sodienthoai: req.body.sodienthoai,
                    diachi: req.body.diachi,
                    hash: hash,
                    salt: salt
                }
            )
            .then(data=>{
                //console.log(data)
                res.send({name: data.email})
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
})
//4.KHACH HANG LOGIN
router.get('/dangnhap', function(req,res,next){
    res.render("./adminlte/pages/3.use/2.login.html",{mes:""})
})


//5.TRANG CỦA KHÁCH HÀNG
router.get('/ttkhachhang', function(req,res,next){
    let token = req.cookies.token
    let decoded  =  jwt.verify(token, process.env.LOGINJWT)
    console.log(decoded.id)

    useModel.findById({
        _id:decoded.id
    })
    .then(data=>{
        console.log(data)
        res.render("./adminlte/pages/3.use/3.ttkh.html",{data:data})
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.put('/ttkhachhang',urlencodedParser, function(req,res,next){
    let token = req.cookies.token
    let decoded  =  jwt.verify(token, process.env.LOGINJWT)
    console.log(req.body)
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(req.body.matkhau, salt, 2000, 64, 'sha512')
    hash = hash.toString('hex')
    useModel.findByIdAndUpdate({_id:decoded.id},
        {
            email: req.body.email,
            hoten: req.body.hoten,
            sodienthoai: req.body.sodienthoai,
            diachi: req.body.diachi,
            hash: hash,
            salt: salt
        }
    )
    .then(data=>{
        console.log(data)
        res.send({name: data.email})
    })
    .catch(err=>{
        console.log(err)
    })
    
})


module.exports = router;