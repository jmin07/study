const express = require('express');
const app = express();

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const passport = require('passport');
const passportConfig = require('./passport/index')  // 폴더내의 index 파일을 기본적으로(default)로 불러온다.

const USERS = require('../DB/users');
const authRouter = require('../Routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'test',
    name: 'test',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}));

app.use(passport.initialize()); // session 보다 뒤에 작성해야한다!
app.use(passport.session());
passportConfig(USERS);  // DB 를 매개변수로 넣어줘야한다.

app.use('/auth', authRouter)

app.use((req, res, next)=>{
    res.status(404).send('Sorry cant find that!');
})

app.use((err, req, res, next)=>{
    res.status(500).send('Something broke!')
})

module.exports = app;