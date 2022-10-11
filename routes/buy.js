const express = require('express');
const router = express.Router();
const Buy = require('../models/buyModel.js');


router.post('/',(req,res)=>{
    console.log(req.body);
    const buy = new Buy({
        name: req.body.buy
    });
    buy.save().then(data=>{
        console.log(buy);
        console.log("successfully created new item");
      }).catch(error=>{
        console.log(error);
        console.log("there is an error");
      })
})

module.exports = router;