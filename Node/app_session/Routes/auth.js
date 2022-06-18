const express = require('express');
const router = express.Router();

const authData = {
    email:"test@naver.com",
    password: '1111',
    nickname: 'test유저',
}

router.get('/', (req, res)=>{
    let output;
    if(req.session.is_logined){
        output =
        `
            <h1>안녕하세요, ${req.session.nickname}</h1>
            <a href = "/auth/logout">logout</a>
        `;
    } else {
        output =
        `
            <h1>Welcome</h1>
            <ul>
                <li><a href="/auth/login">login</a></li>
                <li><a href="/auth/register">register</a></li>
            </ul>
        `;
    }
    res.send(output);
})

router.get('/login', (req, res)=>{
    const output =
    `
        <h1>Login</h1>
        <form action = '/auth/login' method = 'post'>
            <p>
                <input type = 'text' name='email' placeholder = 'username'>
            </p>
            <p>
                <input type = 'password' name='password' placeholder = 'password'>
            </p>
            <p>
                <input type = 'submit'>
            </p>
        </form>
    `;
    res.send(output);
})

router.post('/login', (req, res)=>{
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if(authData.email === userEmail && authData.password === userPassword){
        req.session.is_logined = true;
        req.session.nickname = authData.nickname;
        req.session.save(()=>{  // Session에 결과 값이 바로 저장이 안 되기 때문에 req.session.save() 해야한다.
            res.redirect('/auth');
        });
    } else {
        res.send('Who')
    }
})

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/auth');
    })
})



module.exports = router;