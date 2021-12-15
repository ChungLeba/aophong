const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nodemy:nodemyabc@cluster0.oihzb.mongodb.net/aophongstore?retryWrites=true&w=majority');

module.exports = mongoose