const express = require('express');
const router = express.Router();
// we are using bcrypt hashing algorithm for password hashing
const bcrypt = require('bcrypt');
const User = require('../schemas/userSchema.js');

router.get('/', (req,res,next) => {
    const payload = null;
    res.render('users/login', {payload});
})

router.post('/', async(req,res,next) => {
    const email = req.body.loginEmail.trim();
    const userPassword = req.body.loginPassword;
    const payload = req.body;


    if (email && userPassword) {
        const user = await User.findOne({
                email: email
            })
            .catch((error) => {
                payload.errorMessage = "Account not found!";
                res.render('login',  {payload});
            })
        if (user != null) {
            const auth = await bcrypt.compare(userPassword, user.password);
            if(auth == true){
                req.session.user = user;
                return res.redirect('/home');
            }
            else {
                payload.errorMessage = "Email or Password must be incorrect!";
                res.render('users/login', {payload});
            }
        }  
    }
    payload.errorMessage = "Invalid data!";
    res.render('users/login', {payload});

})

module.exports = router;