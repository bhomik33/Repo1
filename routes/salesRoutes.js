const express = require('express');
const router = express.Router();
const Sale = require('../schemas/salesSchema.js');

router.get('/', (req,res,next) => {
    const payload = null;
    res.render('sales', {payload});
})

router.post('/', async(req,res,next) => {
    const name = req.body.salesProductName;
    const type = req.body.salesProductType;
    const brand = req.body.salesProductBrand;
    const cost = req.body.salesProductCost;
    const quantity = req.body.salesProductQuantity;

    // from stack overflow 
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();  

    const payload = req.body;
    payload.datetime = datetime;
    if(name && type && brand && cost && quantity) {
        const sale = await Sale.create({
            name,
            type,
            brand,
            cost,
            quantity,
            datetime
        })
        res.redirect('/viewSales');
    }
    else {
        payload.errorMessage = "Make sure each field has a valid value!";
        res.render('sales', {payload});
    }


})
module.exports = router;