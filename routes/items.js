const express = require('express');
const router = express.Router();

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

router.post('/item',function(req,res){
  db.collection('items').insertOne(req.body);
  res.status(204).send();
});

module.exports = router;
