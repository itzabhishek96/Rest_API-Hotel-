const express = require('express')
const router = express.Router()
const Product = require('../models/product')


router.get('/', async(req,res) => {
    try{
           const product = await Product.find()
           res.json(product)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const product = await Product.findById(req.params.id)
           res.json(product)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const product = new Product({
        name: req.body.name,
        Price: req.body.Price,
    })

    try{
        const p1 =  await product.save() 
        res.json(p1)
    }catch(err){
        res.send('Error')
    }
})

router.put('/:id', async (req, res) => {
    const update = {
        name: req.body.name,
        Price: req.body.Price
    };

    Object.keys(update).forEach(key => update[key] === undefined ? delete update[key] : {});

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).send('No product found with that ID');
        }
        
        res.json(updatedProduct);
    } catch(err) {
        res.status(400).send('Error updating the product: ' + err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send('No product found with that ID');
        }
        res.json(deletedProduct);
    } catch(err) {
        res.status(400).send('Error deleting the product: ' + err);
    }
});



module.exports = router