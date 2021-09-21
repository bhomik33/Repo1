module.exports.isAuthenticated = (req,res,next) => {
    if(req.session && req.session.user){
        return next();
    }
    // redirecting to login page if the user is not logged in
    return res.redirect('/login');
}