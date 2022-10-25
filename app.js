const express = require('express')
const mongodb = require('mongodb').MongoClient
const path = require('path');
const app = express()
const port = 7777
const router = express.Router();
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

require('dotenv').config();


let db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port,()=>{
  console.log(`Server listening on ${port}`);
})

app.use('/images',express.static(__dirname+'/public/images'));
app.use('/javascripts',express.static(__dirname+'/public/javascripts'));
app.use('/stylesheets',express.static(__dirname+'/public/stylesheets'));

////////////////////////////////////
// MongoDB Connection
////////////////////////////////////

// With Mongoose
// async function connect_mongoose(uri) {  
//   await mongoose.connect(uri, () => {
//       console.log("mongdb is connected");
//   });
// }
// const mongoose = require('mongoose');
// const uri = "";
// connect_mongoose(uri);

// With MongoDB
const uri = process.env.URI_SHANE;
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


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


app.use('/',router)


// Setting Favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/images/favicon.ico'));
});

module.exports = app;

////////////////////////////////////
////////////////////////////////////
// Shane's Playground
////////////////////////////////////
////////////////////////////////////
function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

const storageRouter = require("./routes/storage-route.js");
app.use('/api/storage', storageRouter);

// Print all routes
app._router.stack.forEach(print.bind(null, []))

////////////////////////////////////