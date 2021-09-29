const express = require('express');
const router = express.Router();
const Product = require('../schemas/productSchema.js');

router.get('/', async(req,res,next) => {
    const products = await Product.find({})
    res.render('viewProducts', {products});
    
})
module.exports = router;