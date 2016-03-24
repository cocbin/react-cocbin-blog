'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const router = require('./server/router.js');
const getInitState = require('./server/router.js').getInitState;
const page = require('./server/page.generated.js');

const app = express();
app.listen(3000);
app.use(express.static(path.join(__dirname, '/build')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
    secret:"cocbin is a handsome boy",
    store: new MongoStore({
        url:'mongodb://127.0.0.1:27017/session'
    }),
    cookie:{maxAge:24*60*60*1000},
    resave:false,
    saveUninitialized:true
}));

app.use(router);

app.get('/*',(req,res)=>{
    page(req,res,getInitState);
});

mongoose.connect("mongodb://127.0.0.1:27017/cocbinblog");