const mongoose = require('mongoose');
// create an schema
var userSchema = new mongoose.Schema({
            item: String,
            price: String
        });
var userModel=mongoose.model('items',userSchema);
module.exports = mongoose.model("items",userSchema);