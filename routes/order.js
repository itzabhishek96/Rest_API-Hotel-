const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');


router.post('/', async (req, res) => {
    try {
        const { product, quantity } = req.body;

        const productData = await Product.findById(product);
        if (!productData) {
            return res.status(404).json({ message: "Product not found" });
        }
        const totalPrice = productData.Price * quantity;
        const newOrder = new Order({
            product: product,
            quantity: quantity,
            totalPrice: totalPrice,
            status: 'pending' 
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).send('Error placing order: ' + err);
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        const ordersWithTotalPrice = orders.map(order => ({
            ...order.toJSON(),  
            totalPrice: order.product.Price * order.quantity
        }));
        res.json(ordersWithTotalPrice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router