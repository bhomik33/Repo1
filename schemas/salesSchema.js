const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const salesSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    
    type : {
        type: String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    cost : {
        type : Number,
        required: true
    },
    quantity : {
        type : Number,
        required : true
    },
    datetime : {
        type : String
    }
});

module.exports = mongoose.model('Sales', salesSchema);