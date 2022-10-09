const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000,()=>{
  console.log('Server listening on 3000');
})

app.use('/images',express.static(__dirname+'/public/images'));
app.use('/javascripts',express.static(__dirname+'/public/javascripts'));
app.use('/stylesheets',express.static(__dirname+'/public/stylesheets'));

const mongoose = require('mongoose');
const uri = "mongodb+srv://Yifan:8qTRDXVXgD6MwCno@cluster0.ohharax.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, () => {
  console.log("Connected to Mongo DB Successfully!!");
})


const usersRouter = require('./routes/items.js');
console.log("get item router");
app.use('/item', usersRouter);
app.use('/',(req,res)=>{
  res.sendFile(__dirname+'/views/index.html');
});

/* router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
}); */







//module.exports = app;
