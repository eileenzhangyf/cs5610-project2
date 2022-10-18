const mongoose = require('mongoose')

const storageItem = mongoose.model(
    "storage",
    mongoose.Schema({
        user: String,
        name: String,
        category: String,
        price: { type: Number, min: 0 },
        quantity: Number,
        purchased: Date,
        daysLast: Number
    })
);

module.exports = storageItem;