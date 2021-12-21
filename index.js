const express = require('express')
var path = require('path');
const app = express()
const port = 3000
//import router
var adminRouter = require('./routers/admin');
var customerRouter = require('./routers/customer.js');
var indexRouter = require('./routers/index.js');
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')
const aothunRouter = require('./routers/aothun')
//STATIC FOLDER
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Render HTML
app.engine('html', require('ejs').renderFile)

//TEST RENDER
app.get('/test', (req, res) => {
  res.render('index')
})

//REDERECT TO CUSOMER HOME
app.get('/', (req, res) => {
    res.redirect('/c/home');
})
//ADMIN ROUTER
app.use('/admin', adminRouter)


//CUSTOMER ROUTER
app.use('/c', customerRouter)

app.use('/', indexRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/aothun', aothunRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})