const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const Item = require('../models/itemModel.js');
/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'add item' });
}); */
router.post('/item', (req, res)=> {
    console.log("trying to post");

    const item = new Item({
        item: req.body.item,
        price: req.body.price,
      });
      
    item.save().then(data=>{
      console.log("successfully created new item");
    }).catch(error=>{
      console.log("there is an error");
    })
  

})
module.exports = router;
