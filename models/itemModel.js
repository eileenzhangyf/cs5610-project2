const mongoose = require('mongoose');
// create an schema
const itemSchema = new mongoose.Schema({  
            name: {type:String},
            price: {type:String},
            buy_date: {type:Date}
        
    });
//var userModel=mongoose.model('items',itemSchema);
module.exports = mongoose.model('Item',itemSchema);