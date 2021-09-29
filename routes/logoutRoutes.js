const express = require('express');
const router = express.Router();

// logout by detroying the current session
router.get('/', (req,res,next) => {
    if(req.session && req.session.user){
        req.session.destroy(() => {
            res.redirect('/login');
        })
    }
})

module.exports = router;