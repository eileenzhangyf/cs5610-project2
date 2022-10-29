const express = require('express');
const session = require("express-session");
const app = express();
const router = express.Router();
// const Buy = require('../models/buyModel.js');

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

// router.post('/',(req,res)=>{
//     console.log(req.body);
//     //let today = new ISODate();
//     const buy = new Buy({
//         name: req.body.buy,
//         curr_date: new Date()
//     });
//     console.log(buy);
//     buy.save().then(data=>{
//         console.log("successfully created new item");
//         res.status(204).send();
//       }).catch(error=>{
//         console.log(error);
//         console.log("there is an error");
//       })
// })



router.post('/',function(req,res){
  var collection = 'buys'+req.session.user;
  db.collection(collection).insertOne(req.body);
  console.log(collection);
  res.status(204).send();
  //res.send('Data received:\n' + JSON.stringify(req.body));
});

router.get('/',(req,res)=>{
  var collection = 'buys'+req.session.user;
  console.log(collection);
  db.collection(collection).find().toArray((err,result)=>{
    if (err) return console.log(err);
    res.status(200).json(result);;
  })
});

router.delete('/',(req,res)=>{
  var collection = 'buys'+req.session.user;
  db.collection(collection).deleteMany();
  console.log(res);
})

module.exports = router;