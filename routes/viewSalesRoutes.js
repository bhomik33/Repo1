const express = require('express');
const router = express.Router();
const Sale = require('../schemas/salesSchema.js');



router.get('/', async(req,res,next) => {
    const sales = await Sale.find({})
    res.render('viewSales', {sales});
})

module.exports = router;
