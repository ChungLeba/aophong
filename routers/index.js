var express = require('express');
var router = express.Router();
var path = require('path')
const jwt           = require('jsonwebtoken')
const useModel = require('../models/usemodel')
const checkLogin = require('../middlewares/checkLogin')
const blackListModel = require('../models/blackListmodel')

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'))
  });
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
  })
  router.get('/home', checkLogin, async (req, res) => {
    res.send()
    });

module.exports = router;