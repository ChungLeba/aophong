const express       = require('express')
const jwt           = require('jsonwebtoken')
const useModel  = require('../models/usemodel')
const blackListModel= require('../models/blackListmodel')


async function checkLogin(req, res, next) {
    try {
      const token = req.cookies.userToken
      if(token) {
        var check = await blackListModel.findOne({ token: token })
        // TH1: Có Token, nhưng đã bị xóa cho vào blackList
        if(check) {
          throw new Error('')
        }

        //TH2: Token hợp lệ, next()
        const decode = jwt.verify(token, process.env.LOGINJWT)
        const user = await useModel.findOne({_id: decode._id})
        if(user) {
          req.user = user
          return next()
        }
      }
      //TH3: Không có token
      res.redirect('/login')
    } catch (error) {
      res.json(error)
    }
  }
  module.exports = checkLogin