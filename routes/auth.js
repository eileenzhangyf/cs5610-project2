const router = require('express').Router();
const mongoUtil = require("../db/mongoUtil.js");
// const db = mongoUtil.getDb();

const mname = 'shane'
const mpass = '123'



// Traditional Login
router.post("/api/v0/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username + ":" + password);

    // Authenticate the User
    const query = { "user": username };
    db.collection('users')
        .findOne(query, (err, results) => {
            
        });
    
    // if (username == mname && password == mpass) {
    //     session = req.session;
    //     session.userid = username;
    //     console.log(req.session);
    //     res.redirect('/storage');
    // } else {
    //     console.log("Login Failed");
    //     res.sendFile('views/login.html', {root: __dirname});
    // }
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;