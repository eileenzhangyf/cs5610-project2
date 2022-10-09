const mongoose = require('mongoose');
// create an schema
const itemSchema = mongoose.Schema({  
            name: String,
            price: String
        
    });
//var userModel=mongoose.model('items',itemSchema);
module.exports = mongoose.model('Item',itemSchema);