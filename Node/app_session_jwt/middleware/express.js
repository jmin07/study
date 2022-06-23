// EXPRESS
const express = require('express');
const app = express();

// ENV
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

// ROUTER
const authRouter = require('../Routes/authRoute');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/auth', authRouter)

app.use((req, res, next)=>{
    res.status(404).send('Sorry cant find that!');
})

app.use((err, req, res, next)=>{
    res.status(500).send('Something broke!')
})

module.exports = app;