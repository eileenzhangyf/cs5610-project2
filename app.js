const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://Yifan:8qTRDXVXgD6MwCno@cluster0.ohharax.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, () => {
  console.log("Connected to Mongo DB Successfully!!");
})
/* const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("Connected to Mongo DB Successfully!!");
  //client.close();
}); */
const path = require('path');
var express = require('express');
const router = express.Router();
var app = express();
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const usersRouter = require('./routes/items.js');
app.use('/item', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
});







//module.exports = app;
