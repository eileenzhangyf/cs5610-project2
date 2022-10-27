const express = require('express')
const path = require('path');
const app = express()
const port = 7777
const router = express.Router();
const bodyParser = require('body-parser');
const createError = require('http-errors');

let db;

//require('dotenv').config();

////////////////////////////////////
// Basic Configuration
////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port,()=>{console.log(`Server listening on ${port}`);})
app.use('/images',express.static(__dirname+'/public/images'));
app.use('/javascripts',express.static(__dirname+'/public/javascripts'));
app.use('/stylesheets',express.static(__dirname+'/public/stylesheets'));

// Set Favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/images/favicon.ico'));
});

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
// Routing
////////////////////////////////////
let mongoUtil = require('./db/mongoUtil');

//const usersRouter = require('./routes/items.js');
//app.use('/item', usersRouter);
app.post('/item',function(req,res){
  db.collection('items').insertOne(req.body);
  res.status(204).send();
});


//const buyRouter = require('./routes/buy.js');
//app.use('/buy',buyRouter);
app.post('/buy',function(req,res){
  db.collection('buys').insertOne(req.body);
  //res.send('Data received:\n' + JSON.stringify(req.body));
});

app.use('/',router);

app.get('/buy',(req,res)=>{
  db.collection('buys').find().toArray((err,result)=>{
    if (err) return console.log(err);
    res.status(200).json(result);;
  })
});

module.exports = app;

// Setting Favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/images/favicon.ico'));
});



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


// Print all routes
app._router.stack.forEach(print.bind(null, []))
////////////////////////////////////