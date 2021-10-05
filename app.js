const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const middleware = require('./middleware');
const methodOverride = require('method-override');

// executing the express to use the express methods
const app = express();

const URL = '';
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
const logoutRoutes = require('./routes/logoutRoutes.js');
const viewProductRoutes = require('./routes/viewProductRoutes.js');
const salesRoutes = require('./routes/salesRoutes.js');
const viewSalesRoutes = require('./routes/viewSalesRoutes.js');

app.use(methodOverride('_method'));
app.use('/products', middleware.isAuthenticated, viewProductRoutes);
app.use('/product', middleware.isAuthenticated, productRoutes);
app.use('/register', registerRoutes);
app.use('/login',  loginRoutes);
app.use('/sales',middleware.isAuthenticated, salesRoutes );
app.use('/viewSales', middleware.isAuthenticated, viewSalesRoutes );
app.use('/logout', logoutRoutes );


app.get('/home',middleware.isAuthenticated, (req,res,next) => {
    res.render('sales');
} )
app.get('/', (req,res,next) => {
    res.render('users/login');
})

//Listening to port 3000
const port = 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
