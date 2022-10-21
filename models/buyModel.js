const mongoose = require('mongoose');
// create an schema
const buySchema = new mongoose.Schema({  
            name: {type:String},
            curr_date: {type:Date}
        
    });
module.exports = mongoose.model('Buy',buySchema);