const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

app.use('/', require('./routes/login'));
app.use('/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
}); 