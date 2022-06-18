const express = require('express');
const app = express();

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const authRouter = require('../Routes/auth');

app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: 'test',
    name: 'test',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}))

app.use('/auth', authRouter)

app.use((req, res, next)=>{
    res.status(404).send('Sorry cant find that!');
})

app.use((err, req, res, next)=>{
    res.status(500).send('Something broke!')
})

module.exports = app;