const authService = require('./authService')

/**
 * API No.1
 * API Name: 메인페이지
 * [GET] /auth
 */
 module.exports.getAuth = async (req, res)=>{
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
module.exports.postAuthLogin = async (req, res)=>{
    
    return res.send(createResult);
}