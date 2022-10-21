const express = require('express');
const router = express.Router();
const Buy = require('../models/buyModel.js');


router.post('/',(req,res)=>{
    console.log(req.body);
    //let today = new ISODate();
    const buy = new Buy({
        name: req.body.buy,
        curr_date: new Date()
    });
    console.log(buy);
    buy.save().then(data=>{
        console.log("successfully created new item");
        res.status(204).send();
      }).catch(error=>{
        console.log(error);
        console.log("there is an error");
      })
})

module.exports = router;