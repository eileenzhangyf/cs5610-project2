const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel.js');

console.log("test");
router.route('/').post(function(req, res) {
    console.log("trying to post");

    const item = new Item({
        item: req.body.name,
        price: req.body.price,
      });
      
    item.save().then(data=>{
      console.log("successfully created new item");
    }).catch(error=>{
      console.log(error);
      console.log("there is an error");
    })
  

})
console.log("test2")
module.exports = router;
