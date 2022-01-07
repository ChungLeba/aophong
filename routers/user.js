const router = require('express').Router()
const checkLogin = require('../middlewares/checkLogin')
const UserModel = require('../models/usemodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passJwt = process.env.KEY

router.post('/check', checkLogin, (req,res)=>{
    res.json({status:200, mess:'user da dang nhap'})
})

router.post('/', async (req,res)=>{
    try {
        const check = await UserModel.findOne({email: req.body.email})
        if(check){
            res.json({status:400, mess:'email da ton tai'})
        }else{
            req.body.hash = await bcrypt.hash(req.body.password, 10)
            req.body.salt = 10
            const user = await UserModel.create(req.body)
            res.json({status:200, mess:'thanh cong', user})
        }
    } catch (error) {
        console.log(error);
        res.json({status:500, mess:'loi server', error})
    }
})

router.post('/login', async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const check = await UserModel.findOne({email})
        if(check){
            const checkPass = await bcrypt.compare(password, check.hash)
            if(checkPass){
                let id = check._id.toString()
                console.log(38, id);
                const token = jwt.sign({id: id}, passJwt, {expiresIn:'7d'})
                res.json({status:200, mess:'dang nhap thanh cong', token})
            }else{
                res.json({status:400, mess:'sai password'})
            }
        }else{
            res.json({status:400, mess:'sai email'})
        }
    } catch (error) {
        res.json({status:500, mess:'loi server'})
    }
})

module.exports = router