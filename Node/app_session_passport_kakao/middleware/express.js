// EXPRESS
const express = require('express');
const app = express();

// ENV
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

// SESSION
const session = require('express-session');

// DATABASE
const pool = require('../Database/database');    
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({}, pool)

// PASSPORT
const passport = require('passport');
const passportConfig = require('./passport/index')  // 폴더내의 index 파일을 기본적으로(default)로 불러온다.

// ROUTER
const authRouter = require('../Routes/authRoute');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));

// session 보다 뒤에 작성해야한다!
app.use(passport.initialize()); 
app.use(passport.session());
passportConfig(); 

app.use('/auth', authRouter)

app.use((req, res, next)=>{
    res.status(404).send('Sorry cant find that!');
})

app.use((err, req, res, next)=>{
    res.status(500).send('Something broke!')
})

module.exports = app;