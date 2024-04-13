const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/AlienDBex'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const productRouter = require('./routes/product')
app.use('/product', productRouter)

const orderRouter = require('./routes/order');
app.use('/orders', orderRouter);

app.listen(9000, () => {
    console.log('Server started')
})