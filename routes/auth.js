const router = require('express').Router();
const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

var session;

// Simple Login
router.post("/login", (req, res) => {
    console.log(req.body);
    const username = req.body.user;
    const password = req.body.password;
   // const { username, email } = req.body;
    console.log(username + ":" + password);

    // Authenticate the User
    const query = { user: username };
    db.collection('users')
        .findOne(query, async (err, results) => {
            if (err) throw err;

            if (results) {
                console.log('User exists');
                
                // Check email
          /*       if (results.email != email) {
                    res.status(401).send('Invalid username or password');
                    return;
                } */
            } else { // Register the user
                console.log('User does not exist will register');
                
                let data = {
                    user: username,
                    password: password
                };
                
                db.collection('users').insertOne(data)
                    .then(result => {
                        console.log("User successfully created: " + result.insertedId);
                    }).catch(err => {
                        console.error(err || `Error occurred when inserting data=${data}.`);
                    });   
            }

            session = req.session;
            session.user = username;
            console.log(session);
            res.send(session);
            //res.redirect('/storage');
        });
});

//console.log("session is:"+session);

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;