var express = require('express');
var router = express.Router();


//1.TRANG CHU
router.get('/home', function(req,res,next){
    res.send("Trang chủ")
})
//2.CHI TIET
router.get('/ao-phong/:id', function(req,res,next){
    res.send("Trang chi tiet")
})

module.exports = router;