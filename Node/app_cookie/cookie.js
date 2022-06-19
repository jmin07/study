const http = require('http');

http.createServer((req, res)=>{
    res.writeHead(200, {
        'set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry']
    });
    res.end('Cookie!!');
}).listen(3000, ()=>{
    console.log('3000 port listening!!');
});