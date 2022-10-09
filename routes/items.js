const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel.js');


router.post('/',(req, res)=> {
  //console.log(req.body);
    const item = new Item({
        name: req.body.item[0],
        price: req.body.item[1],
      });
     
    item.save().then(data=>{
      console.log(item);
      console.log("successfully created new item");
    }).catch(error=>{
      console.log(error);
      console.log("there is an error");
    })
  

})

module.exports = router;
