require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// DB INIT
const mongoose = require('mongoose');
const user = process.env.DB_USER;
mongoose.connect(`mongodb://${user}:${process.env.DB_PASSWORD}@ds137703.mlab.com:37703/heroku_rlh2zbc8`, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Successfully connected to DB');
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middleware/cors.middleware'));
app.use('/api', require('./routes/index.routes'));

module.exports = app;
