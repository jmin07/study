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

// 유저 로그아웃
router.get('/logout', auth.getAuthLogout);

// 유저 회원가입
router.post('/register', auth.postAuthRegister);

// 유저 로그인
router.post('/login', auth.postAuthLogin);

// JTW
module.exports = router;