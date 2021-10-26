const express = require('express');
const router = express.Router();
const fs = require('fs');
const {Parser} = require('json2csv');
const Product = require('../schemas/productSchema.js');
const Sale = require('../schemas/salesSchema.js');



router.get('/', async(req,res,next) => {
    const sales = await Sale.find({});
    var saleForecastData = [];
    for(let sale of sales){
       if (sale.datetime.includes('26/10/2021')) {
           saleForecastData.push(sale);
       }
    }
  res.render('viewSalesForecast', {saleForecastData});

})

module.exports = router;