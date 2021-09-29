const express = require('express');
const router = express.Router();
const Product = require('../schemas/productSchema.js');

// get request to show the add product form
router.get('/', (req,res,next) => {
    const payload = null;
    res.render('product', {payload})
})

// get request to show the edit product form 
router.get('/:id/edit', async(req,res,next) => {
    const {id} = req.params;
    const product =  await Product.findById(id);
    res.render('editProduct', {product});
})

// update the products
router.post('/:id', async(req,res,next) => {
    const {id}  = req.params;
    const name = req.body.productName;
    const type = req.body.productType;
    const brand = req.body.productBrand;
    const quantity = req.body.productQuantity;

    const product = await Product.findByIdAndUpdate(id,{name,type,brand,quantity});
    await product.save();
    res.redirect('/products');
    
})

router.delete('/:id', async(req,res,next) => {
    const {id} = req.params;
    console.log(id);
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})




// post request to enter the product details to the database
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
        res.redirect('/products');
    }
    else {
        payload.errorMessage = "Make sure each field has a valid value!";
        res.render('product', {payload});
    }
})

module.exports = router;
