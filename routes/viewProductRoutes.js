const express = require('express');
const router = express.Router();
const fs = require('fs');
const {Parser} = require('json2csv');
const Product = require('../schemas/productSchema.js');

router.get('/', async(req,res,next) => {
    const products = await Product.find({})
    res.render('viewProducts', {products});
    
})
router.get('/generateCSV', async(req,res,next) => {
    const products = await Product.find({})
    const fields = Object.keys(products[0]);
    const csv = new Parser({fields});
    fs.writeFile('productsData.csv', csv.parse(products), function(err){
        if(err) {
            console.error(err);
            throw err;
        }
        console.log('file saved');
    })
    res.render('CSVNotify');

})

router.get('/box', async(req,res,next) => {
    const products = await Product.find({})
    res.render('boxViewProducts', {products});
    
})
module.exports = router;