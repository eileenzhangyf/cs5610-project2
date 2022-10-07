var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/userModel');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'add item' });
});
router.post('/add-item', function(req, res, next) {
    
    req.assert('item', 'Name is required').notEmpty()           //Validate name
    req.assert('price', 'A valid email is required').isEmail()  //Validate email
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
      var userDetails = new userModel({
        item: req.body.item,
        price: req.body.price,
      });
      
      userDetails.save((err, doc) => {
            if (!err){
                req.flash('success', 'User added successfully!');
                res.redirect('/');
            }
            else{
                console.log('Error during record insertion : ' + err);
            }
      });
  
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        res.render('/', { 
            title: 'Add New User',
            item: req.body.item,
            price: req.body.price
        })
    }
});
module.exports = router;
