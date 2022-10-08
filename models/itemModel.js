const mongoose = require('mongoose');
// create an schema
const itemSchema = mongoose.Schema({
            item: {type:String,required:true},
            price: {type:String,required:true}
        })
//var userModel=mongoose.model('items',itemSchema);
module.exports = mongoose.model('Item',itemSchema);