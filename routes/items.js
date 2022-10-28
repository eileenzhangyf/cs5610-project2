const express = require('express');
const router = express.Router();

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();


// router.post('/',(req, res)=> {
//   //console.log(req.body);
//     const item = new Item({
//         name: req.body.item[0],
//         price: req.body.item[1],
//         buy_date: req.body.item[2]
//       });
//     console.log(item);
//     item.save().then(data=>{
//       console.log("successfully created new item");
//       res.status(204).send();
//     }).catch(error=>{
//       console.log(error);
//       console.log("there is an error");
//     })
// })

router.post('/item',function(req,res){
  db.collection('items').insertOne(req.body);
  res.status(204).send();
});

module.exports = router;
