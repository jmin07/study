const authService = require('./authService')
const passport = require('passport');

/**
 * API No.1
 * API Name: 메인페이지
 * [GET] /auth
 */
 module.exports.getAuth = async (req, res)=>{
    console.log("getAuth :", req.session.passport);
    let output;
    if(req.session.passport || res.){
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
            <a href="/auth/kakao">카카오톡 로그인</a>
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
    if(createResult.isSuccess) {
        return res.redirect('/auth');
    }
}

/**
 * API No.5
 * API Name: 유저 로그인
 * [POST] /auth/login
 */

// 로그인 정보가 DB와 같은 것인지 비교한다?
module.exports.postAuthLogin = async (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{  // LocalStrategy 실행  및 done 에서 넘겨주는 정보를 가지고 있다.
        console.log("info :", info);
        console.log("user :", user);

        // done의 결과를 return 해줘야한다.
        if(err){
            console.error(authError);
            return next(authError);
        }

        // 만약 유저 정보가 없는 경우   
        if(!user){
            return (
                res.redirect('/auth/login')
            )
        }

        return (
            req.login(user, (loginError)=>{
                if(loginError){
                    console.error(loginError);
                }
                return res.redirect('/auth')
            })
        )
    })(req, res, next)  // 미들웨어 내에서 미들웨어
}

/**
 * API No.6
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


/**
 * API No.7
 * API Name: 카카오톡 로그인
 * [GET] /auth/kakao/callback
 */

module.exports.kakaoLogin = async (req, res, next)=>{
    console.log("01?")
    passport.authenticate('kakao',{failureRedirect: '/auth/register'})(req, res, next);
    console.log("02?")
    return res.redirect('/auth');
};