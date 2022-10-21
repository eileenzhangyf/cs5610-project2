const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel.js');


router.post('/',(req, res)=> {
  //console.log(req.body);
    const item = new Item({
        name: req.body.item[0],
        price: req.body.item[1],
        buy_date: req.body.item[2]
      });
    console.log(item);
    item.save().then(data=>{
      console.log("successfully created new item");
      res.status(204).send();
    }).catch(error=>{
      console.log(error);
      console.log("there is an error");
    })
  

})

module.exports = router;
