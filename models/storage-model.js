const mongoose = require('mongoose')

const storageItem = mongoose.model(
    "storage",
    mongoose.Schema({
        user: String,
        item: String,
        category: String,
        price: { type: Number, min: 0 },
        quantity: { type: Number, min: 0 },
        purchased: Date,
        daysLast: Number
    })
);

module.exports = storageItem;