const mongoose = require('mongoose');
// create an schema
const itemSchema = new mongoose.Schema({  
            name: {type:String},
            price: {type:String}
        
    });
//var userModel=mongoose.model('items',itemSchema);
module.exports = mongoose.model('Item',itemSchema);