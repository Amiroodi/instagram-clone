const express = require('express');
const path = require('path');
const sessions = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

// setting the public folder path
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));


// setting session middleware
const oneDay = 1000 * 60 * 15; // 15 minutes
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: {maxAge: oneDay},
    resave: false 
}));


// setting the main url paths

app.get('/', require('./routes/home'));
app.use('/user', require('./routes/user'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));

app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
}); 