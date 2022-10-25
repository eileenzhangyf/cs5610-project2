const express = require('express')
const mongodb = require('mongodb').MongoClient
const path = require('path');
const app = express()
const port = 7777
const router = express.Router();
const bodyParser = require('body-parser');


let db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port,()=>{
  console.log(`Server listening on ${port}`);
})

app.use('/images',express.static(__dirname+'/public/images'));
app.use('/javascripts',express.static(__dirname+'/public/javascripts'));
app.use('/stylesheets',express.static(__dirname+'/public/stylesheets'));
let connectionString = 'mongodb://localhost:27017/foodkeeper'
dbConn = mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
    console.log("db connected");
   // app.listen(7777)
  }
)
/*
const mongoose = require('mongoose');
const uri = "mongodb+srv://Yifan:8qTRDXVXgD6MwCno@cluster0.ohharax.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, (err, database) => {
  console.log("Connected to Mongo DB Successfully!!");
  db = database;
})*/

////////////////////////////////////
// Page Redirection
////////////////////////////////////
router.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
}); 

router.get('/list', function(req,res){
  res.sendFile(path.join(__dirname+'/views/shopping-list.html'));
}); 

router.get('/storage', function(req, res) {
  res.sendFile(path.join(__dirname+'/views/storage-list.html'));
});

////////////////////////////////////

const usersRouter = require('./routes/items.js');
app.use('/item', usersRouter);

const buyRouter = require('./routes/buy.js');
app.use('/buy',buyRouter);

app.use('/',router);

app.get('/buy',(req,res)=>{
  db.collection('buys').find().toArray((err,result)=>{
    if (err) return console.log(err);
    res.send(result);
  })
});

app.delete('/done',(req,res)=>{
  db.collection('buys').deleteMany();
  console.log(res);
})

// Setting Favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/images/favicon.ico'));
});


module.exports = app;
