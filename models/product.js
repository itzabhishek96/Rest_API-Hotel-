const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },

})

module.exports = mongoose.model('product',productSchema)