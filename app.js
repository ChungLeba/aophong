const express = require('express')
var path = require('path');
const app = express()
const port = 3000
//import router
var adminRouter = require('./routers/admin');
var customerRouter = require('./routers/customer.js');
//STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


//REDERECT TO CUSOMER HOME
app.get('/', (req, res) => {
    res.redirect('/c/home');
})
//ADMIN ROUTER
app.use('/admin', adminRouter)


//CUSTOMER ROUTER
app.use('/c', customerRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})