const express = require('express');
const router = express.Router();
const Product = require('../schemas/productSchema.js');

router.get('/', (req,res,next) => {
    const payload = null;
    res.render('product', {payload})
})

router.post('/', async (req,res,next) => {
    const name = req.body.productName;
    const type = req.body.productType;
    const brand = req.body.productBrand;
    const quantity = req.body.productQuantity;

    const payload = req.body;
    console.log(req.body);
    if(name && type && brand && quantity) {
        const product = await Product.create({
            name,
            type,
            brand,
            quantity
        })
        res.redirect('/home');
    }
    else {
        payload.errorMessage = "Make sure each field has a valid value!";
        res.render('product', {payload});
    }
})

module.exports = router;