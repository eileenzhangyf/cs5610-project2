const mongoose = require('mongoose');
// create an schema
const buySchema = new mongoose.Schema({  
            name: {type:String}
        
    });
module.exports = mongoose.model('Buy',buySchema);