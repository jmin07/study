const express = require('express');
const router = express.Router();
const passport = require('passport');
const USERS = require('../DB/users');

// 메인 페이지
router.get('/', (req, res)=>{
    let output;
    if(req.session.passport){
        output =
        `
            <h1>안녕하세요, ${req.session.passport.user}</h1>
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

// 로그인 화면
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

// 로그인
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{  // LocalStrategy 실행  및 done 에서 넘겨주는 정보를 가지고 있다.
        // done의 결과를 return 해줘야한다.
        if(err){
            console.error(authError);
            return next(authError);
        }

        // 만약 유저 정보가 없는 경우   
        if(!user){
            return (
                res.redirect('/auth')
            )
        }

        return (
            req.login(user, (loginError)=>{
                if(loginError){
                    console.error(loginError);
                }
                return res.redirect('/auth');
            })
        )
        
    })(req, res, next)  // 미들웨어 내에서 미들웨어 
})

// 로그아웃
router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/auth');
    })
})



module.exports = router;