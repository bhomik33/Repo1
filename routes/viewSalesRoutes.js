const express = require('express');
const fs = require('fs');
const {Parser} = require('json2csv');
const router = express.Router();
const Sale = require('../schemas/salesSchema.js');
const products = require('./seeds/products.js');


router.get('/', async(req,res,next) => {
    const sales = await Sale.find({});
    var total = 0;

  


    for(let sale of sales){
        total += sale.cost * sale.quantity;
    }
    res.render('viewSales', {sales, total});
});

router.post('/', async(req,res,next) => {
    const month = req.body.salesMonth;
    var sales = await Sale.find({});
    const salesMonth = [];
    var total = 0;
    for(let sale of sales){
        if(sale.datetime.includes(month)){
            salesMonth.push(sale);
        }
    }
    for(let sale of salesMonth){
        total += sale.cost * sale.quantity;
    }
    sales = salesMonth;

    res.render('viewSales', {sales, total});
})

router.get('/generateCSV', async(req,res,next) => {
    const sales = await Sale.find({})
    const fields = Object.keys(sales[0]);
    const csv = new Parser({fields});
    fs.writeFile('salesData.csv', csv.parse(sales), function(err){
        if(err) {
            console.error(err);
            throw err;
        }
        console.log('file saved');
    })
    res.render('CSVNotify');

})
router.get('/box', async(req,res,next) => {
    const sales = await Sale.find({})
    res.render('boxViewSales', {sales});
    
})

module.exports = router;
