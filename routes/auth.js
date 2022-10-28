const router = require('express').Router();
const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

// Simple Login
router.post("/login", (req, res) => {
    const { username, email } = req.body;
    console.log(username + ":" + email);

    // Authenticate the User
    const query = { "user": username };
    db.collection('users')
        .findOne(query, async (err, results) => {
            if (err) throw err;
            console.log('results', results);

            // User not exist => Register the user
            if (!results) { 
                console.log('User does not exist');
                
                let data = {
                    user: username,
                    email: email
                };
                
                db.collection('users').insertOne(data)
                    .then(result => {
                        console.log("User successfully created: "+result.insertedId);
                    }).catch(err => {
                        console.error(err || `Error occurred when inserting data=${data}.`);
                    });   
            }

            session = req.session;
            session.user = username;
            res.redirect('/storage');
        });
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;