const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const middleware = require('./middleware');

// executing the express to use the express methods
const app = express();

const URL = 'mongodb+srv://bkinger:nFqls6bGnaf6CVsI@cluster0.fbz0o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// connecting to MongoDB database 
mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
})

const sessionConfig = {
    secret: 'assasin1992',
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 *7,
        maxAge : 1000 * 60 * 60 * 24 *7
    }
}

app.use(session(sessionConfig));

// setting the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.engine('ejs', ejsMate);

//serving the static files like additional css and js files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Importing routes in the app
const registerRoutes = require('./routes/registerRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const productRoutes = require('./routes/productRoutes.js');

app.use('/product', productRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);


app.get('/home',middleware.isAuthenticated, (req,res,next) => {
    res.render('home');
} )
//Listening to port 3000
app.listen(5000, () => {
    console.log('Server is running on port 3000');
})