const os = require('os');
const path = require('path');
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    const output = 
    `
        <form action="/" method="post">
            <input type = 'submit'>
        </form>
    `
    res.send(output);
})

app.post('/', (req, res)=>{

    const accessToken = jwt.sign(
        { "username": "username" },
        "asdkfnweovnowe",
        { expiresIn: '30s' }
    );
    console.log(accessToken);
    res.json({accessToken: accessToken});
})

app.listen(3000, ()=>{
    console.log('listening 3000 port')
})
















/*
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename, '\n');

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))
*/