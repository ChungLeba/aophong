var express = require('express');
var router = express.Router();
var path = require('path');
const multer  = require('multer')
var fs = require('fs')

var aothunModel = require('../models/aothunmodel')
var useModel = require('../models/usemodel')
//XÁC THỰC & PHÂN QUYỀN
require('dotenv').config()
var jwt = require('jsonwebtoken');
//Kiểm tra login quản lý và nhân viên
var checklogin = function(req,res,next){
    let token = req.cookies.token
    console.log(token)
    useModel.findOne({
        lasttoken: token
    })
    .then(data=>{
        //console.log("token:"+ data)
        if(data){
            console.log("Token bị rò rỉ")
            res.send("Vui lòng liên hệ admin ^.^")
        } else {
            jwt.verify(token, process.env.LOGINJWT, function(err, data){
                if(err){
                    //console.log(err)
                    res.redirect('/admin')
                } else {
                    console.log("Token hợp lệ: ", data)
                    //tìm quyền
                    useModel.findById({_id:data.id})
                    .then(data=>{
                        req.permis = parseInt(data.phanquyen)
                        console.log('Quyền user này: '+req.permis)
                        return next()
                    })
                    
                    
                }
            })
        }
        
    })
}
//Kiểm tra quyền hạn

//NHAN VIEN & ADMIN
var checkpermisVNQL = function(req,res,next){
    if (req.permis===1 || req.permis===2 ){
        return next()
    } else{
        res.redirect("/c/khachhang")
    }
}
//QUAN LY
var checkpermisQL = function(req,res,next){
    if (req.permis===1){
        return next()
    } else{
        res.send("Chỉ có quản lý mới có quyền này, vui lòng liên hệ Quản lý của cửa hàng")
    }
}


//BODYPASER
var bodyParser = require('body-parser');
const { listIndexes } = require('../models/aothunmodel');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//UPLOAD
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname.replace(' ','-'))
    }
  })
const upload = multer({ storage: storage })
//CRYPTO
var crypto = require("crypto")



//LOGIN
//GET ADMIN LOGIN
router.get('/', function(req,res,next){
    //res.send("Trang tổng quan")
    //res.sendFile(path.join(__dirname, '../views/adminlte/index.html'))
    res.render("./adminlte/pages/3.use/2.login.html",{mes:""})
})
//POST CHECK ACC
router.post('/',urlencodedParser, function(req,res,next){
    //console.log(req.body)
    console.log(req.body.pass)
    useModel.findOne({
        email: req.body.email
    })
    .then(data=>{
        console.log(data)
        if(data){
            let hash_check = crypto.pbkdf2Sync(req.body.pass, data.salt, 2000, 64,'sha512')
            hash_check = hash_check.toString('hex')
            //console.log(hash_check)
            if(
                hash_check == data.hash
            ){  
                console.log('id: '+ data._id)
                var token = jwt.sign({id:data._id}, process.env.LOGINJWT, {expiresIn: "1h"});
                
                res.cookie("token", token)
                res.redirect("/admin/quanly")
                
            } 
            else if(hash_check != data.hash){
                res.render("./adminlte/pages/3.use/2.login.html",{mes:"Mật khẩu sai !!!"})
            }
        }

        if(data == null) {
            res.render("./adminlte/pages/3.use/2.login.html",{mes:"Tài khoản không tồn tại"})
            //res.send({mes:"Vui lòng kiểm tra lại tài khoản và mật khẩu"})
        }
    })
    .catch(err=>{
        console.log(err)
    })
})
//LOGOUT
router.get('/logout', function(req,res,next){
    //res.send("Trang tổng quan")
    //res.sendFile(path.join(__dirname, '../views/adminlte/index.html'))
    let token = req.cookies.token
    let decoded  =  jwt.verify(token, process.env.LOGINJWT)
    console.log(decoded.id)
    useModel.findByIdAndUpdate({_id:decoded.id},
        {
            lasttoken: token
        }
        )
    .then(data=>{
        console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })
    res.clearCookie("token");
    res.render("./adminlte/pages/3.use/2.login.html",{mes:"Vui lòng đăng nhập lại để sử dụng"})
})

//CRDU

//1.TRUNG TAM QUAN LY
router.get('/quanly',checklogin,checkpermisVNQL,
    function(req,res,next){   
    //res.send("Trang tổng quan")
    //res.sendFile(path.join(__dirname, '../views/adminlte/index.html'))
    res.render("./adminlte/index.html",{admin:"Administrator"})
})
//2.SAN PHAM
//2.1 QUAN LY SAN PHAM
router.get('/quanlysanpham',checklogin,checkpermisVNQL, function(req,res,next){
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
router.get('/sp/:id',checklogin,checkpermisVNQL, function(req,res,next){
    console.log(req.params.id)
    aothunModel.findById({_id: req.params.id})
    .then(data=>{
        console.log(data)
        res.render("./adminlte/pages/1.sanpham/5.xemsanpham.html", {data:data})
    })
    
})


//2.3 THEM SAN PHAM
router.get('/themsanpham',checklogin,checkpermisVNQL, function(req,res,next){
    //res.send("Trang tổng quan san pham")
    //res.sendFile(path.join(__dirname, '../views/adminlte/pages/1.sanpham/2.themsanpham.html'))
    res.render("./adminlte/pages/1.sanpham/2.themsanpham.html")
})
router.post('/themsanpham',checklogin,checkpermisVNQL,urlencodedParser,upload.array('imgurl', 10), function(req,res,next){
    console.log(req.body)
    //console.log(req.files)
    let imgurls= [];
    for (let index = 0; index < req.files.length; index++) {
        imgurls.push(req.files[index].filename)
    }
    console.log(imgurls)
    /* let size = req.body.size.split(",")

    let mausac = req.body.mausac.replace(/\s/g,'')
    console.log(mausac)
    mausac = mausac.split(",")
    console.log(mausac) */

    aothunModel.create(
        {
        ten: req.body.ten,
        masanpham: req.body.masanpham,
        mota: req.body.mota,
        thuonghieu: req.body.thuonghieu,
        size: req.body.size,
        mausac: req.body.mausac,
        gia: req.body.gia,
        soluong: req.body.soluong,
        imgurl:imgurls
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
router.get('/sp/edit/:id',checklogin,checkpermisVNQL, function(req,res,next){
    console.log(req.params.id)
    aothunModel.findById({_id: req.params.id})
    .then(data=>{
        console.log(data)
        res.render("./adminlte/pages/1.sanpham/6.suasanpham.html",{data:data})
    })
})
router.put('/sp/:id',checklogin,checkpermisVNQL,urlencodedParser,upload.array('imgurl', 10), function(req,res,next){
    //console.log(req.params.id)
    console.log(req.body)
    /* console.log(req.body.size)
    let size = JSON.parse(req.body.size)
    console.log(size) */

    let imgurls= [];

    for (let index = 0; index < req.files.length; index++) {
        imgurls.push(req.files[index].filename)
    }

    aothunModel.findByIdAndUpdate({_id:req.params.id},
        {
        ten: req.body.ten,
        masanpham: req.body.masanpham,
        mota: req.body.mota,
        thuonghieu: req.body.thuonghieu,
        /* size: JSON.parse(req.body.size),
        mausac: JSON.parse(req.body.mausac), */
        size: req.body.size,
        mausac: req.body.mausac,
        gia: req.body.gia,
        soluong: req.body.soluong,
        $push: {imgurl:imgurls}
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
router.delete('/sp/:id',checklogin,checkpermisVNQL,urlencodedParser, function(req,res,next){
    //console.log(req.params.id)
    console.log(req.body)
    //Tìm xóa file
    aothunModel.findById({_id:req.body.id})
    .then(data=>{
        console.log(data.imgurl)
        if (data) {
            //Xóa file hình
            for (let index = 0; index < data.imgurl.length; index++) {
                fs.unlink('public/uploads/'+data.imgurl[index], function (err){
                    if (err) throw err;
                    console.log('File deleted!');
            })
        }
        
    }
    })
    .catch(err=>{
        console.log(err)
    })
    //Xóa bài
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
//2.6 LOẠI BỎ HÌNH ẢNH SẢN PHẨM
router.delete('/sp/img/:id',checklogin,checkpermisVNQL,urlencodedParser, function(req,res,next){
    //console.log(req.params.id)
    console.log(req.body)
    //Xóa file
    fs.unlink('public/uploads/'+req.body.imgxoa, function (err){
        if (err) throw err;
        console.log('File deleted!');
    })
    //Xóa đường dẫn trong csdl
    aothunModel.findByIdAndUpdate({_id:req.params.id},
        {
        $pull: {imgurl:req.body.imgxoa}
        }
    )
    .then(data=>{
        //console.log(data)
        
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
router.get('/quanlynguoidung',checklogin,checkpermisQL, function(req,res,next){
    useModel.find()
    .then(data=>{
        //console.log(data)
        res.render("./adminlte/pages/1.sanpham/4.quanlynguoidung.html",{data:data})

    })
})
//4.1.THEM NGUOI DUNG
router.get('/themnguoidung',checklogin,checkpermisQL, function(req,res,next){
    res.render("./adminlte/pages/1.sanpham/3.1.themnguoidung.html")
})
router.post('/themnguoidung',checklogin,checkpermisQL,urlencodedParser, function(req,res,next){
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
//4.2.UPDATE NGUOI DUNG
router.get('/themnguoidung/:id',checklogin,checkpermisQL,urlencodedParser, function(req,res,next){
    useModel.findById({
        _id: req.params.id
    })
    .then(data=>{
        res.render("./adminlte/pages/1.sanpham/3.2.suanguoidung.html",{data:data})
    })
    
})

router.put('/themnguoidung/:id',checklogin,checkpermisQL,urlencodedParser, function(req,res,next){
    console.log(req.body)
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(req.body.matkhau, salt, 2000, 64, 'sha512')
    hash = hash.toString('hex')
    useModel.findByIdAndUpdate({_id:req.params.id},
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
        console.log(data)
        res.send({name: data.email})
    })
    .catch(err=>{
        console.log(err)
    })
})

//4.3.DELETE NGUOI DUNG
router.delete('/themnguoidung/:id',checklogin,checkpermisQL,urlencodedParser, function(req,res,next){
    console.log(req.body)
    useModel.findByIdAndDelete({_id:req.body.id})
    .then(data=>{
        console.log(data)
        res.send({name: "Đã xóa"})
    })
    .catch(err=>{
        console.log(err)
    })
})
//4.4 KHACH HANG DANG KI


module.exports = router;