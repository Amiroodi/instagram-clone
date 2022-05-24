const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setting the public folder path
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

// setting the main url paths
app.use('/', require('./routes/login'));
app.use('/users', require('./routes/users'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/upload_photo', require('./routes/upload_photo'));

app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
}); 