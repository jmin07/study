// EXPRESS
const express = require('express');
const router = express.Router();

// CONTROLLER
const auth = require('./authController');


// ---------------- ROUTER -------------------
// 메인 페이지
router.get('/', auth.getAuth);

// 로그인 화면
router.get('/login', auth.getAuthLogin);

// 회원가입 화면
router.get('/register', auth.getAuthRegister);

// 유저 회원가입
router.post('/register', auth.postAuthRegister);

// 유저 로그인
router.post('/login', auth.getAuthLogin);

// // 로그인
// router.post('/login', (req, res, next)=>{
//     passport.authenticate('local', (err, user, info)=>{  // LocalStrategy 실행  및 done 에서 넘겨주는 정보를 가지고 있다.
//         // done의 결과를 return 해줘야한다.
//         if(err){
//             console.error(authError);
//             return next(authError);
//         }

//         // 만약 유저 정보가 없는 경우   
//         if(!user){
//             return (
//                 res.redirect('/auth')
//             )
//         }

//         return (
//             req.login(user, (loginError)=>{
//                 if(loginError){
//                     console.error(loginError);
//                 }
//                 return res.redirect('/auth');
//             })
//         )
        
//     })(req, res, next)  // 미들웨어 내에서 미들웨어 
// })

// // 로그아웃
// router.get('/logout', (req, res)=>{
//     req.session.destroy((err)=>{
//         res.redirect('/auth');
//     })
// })



module.exports = router;