const authService = require('./authService')
const passport = require('passport');

/**
 * API No.1
 * API Name: 메인페이지
 * [GET] /auth
 */
 module.exports.getAuth = async (req, res)=>{
    // console.log("getAuth :", req.session.passport);
    let output;
    if(req.cookie){
        output =
        `
            <h1>안녕하세요, ${req.cookie}</h1>
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
 }


 /**
 * API No.2
 * API Name: 로그인 페이지
 * [GET] /auth/login
 */
 module.exports.getAuthLogin = async (req, res)=>{
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
 }


/**
 * API No.3
 * API Name: 회원가입 페이지
 * [GET] /auth/register
 */
module.exports.getAuthRegister = async (req, res)=>{
    const output =
    `
        <h1>Register</h1>
        <form action = '/auth/register' method = 'post'>
            <p>
                <input type = 'text' name='email' placeholder = 'username'>
            </p>
            <p>
                <input type = 'password' name='password' placeholder = 'password'>
            </p>
            <p>
                <input type = 'text' name='name' placeholder = 'name'>
            </p>
            <p>
                <input type = 'submit'>
            </p>
        </form>
    `;
    res.send(output);
}

/**
 * API No.4
 * API Name: 유저 생성(회원가입)
 * [POST] /auth/register
 */
module.exports.postAuthRegister = async (req, res)=>{
    const { email, password, name } = req.body;

    const createResult = await authService.createUser(email, password, name);

    return res.send(createResult);
}

/**
 * API No.5
 * API Name: 유저 로그인
 * [POST] /auth/login
 */

// 로그인 정보가 DB와 같은 것인지 비교한다?
module.exports.postAuthLogin = async (req, res)=>{
    const { email, password } = req.body;

    const loginResult = await authService.loginUser(email, password);
    console.log(loginResult);
    
    return res.send(loginResult);
}

/**
 * API No.5
 * API Name: 유저 로그아웃
 * [GET] /auth/logout
 */

module.exports.getAuthLogout = (req, res) => {
    req.session.destroy((err)=>{
        if(err) {
            return console.log(err);
        }
        return res.redirect('/auth');
    })
}