const express = require('express');
const router = express.Router();
// we are using bcrypt hashing algorithm for password hashing
const bcrypt = require('bcrypt');
const User = require('../schemas/userSchema.js');

router.get('/', (req,res,next) => {
    const payload = null;
    res.render('users/register', {payload});
})

router.post('/', async(req,res,next) => {
   const firstName = req.body.registerFirstName.trim();
   const lastName = req.body.registerLastName.trim();
   const email = req.body.registerEmail.trim();
   const userPassword = req.body.registerPassword;

   const payload = req.body;

   if(firstName && lastName && email && userPassword){
       // checking if the user of same email is already registered or not
       // email should be unique
       const user = await User.findOne({email : email});

       if (user == null) {
       password = await bcrypt.hash(userPassword, 10 );
       const newUser = await User.create({
           firstName,
           lastName,
           email,
           password
       })
       req.session.user = newUser;
       res.redirect('/home');
    }
       else {
        if (email == user.email) {
            payload.errorMessage = "Email already in use!";
        } 
        res.render('users/register', {payload});
    }
}
    else {
    payload.errorMessage = "Make sure each field has a valid value!";
    res.render('users/register', {payload});
}
})
module.exports = router;