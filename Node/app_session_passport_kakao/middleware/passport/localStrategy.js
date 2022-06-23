const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const authProvider = require('../../Routes/authProvider');

// 유저 정보 인증 전략 방법
module.exports = ()=>{

    passport.use(new LocalStrategy({
        // 오버라이딩
        usernameField: 'email',     // req.body.email
        passwordField: 'password'   // req.body.password
    }, async (email, password, done)=>{   // 로그인 하는 유저 정보가 들어온다.
        console.log("local:", email, password);
        
        // 유저 조회
        const exUser = await authProvider.localUser([email])
        console.log(exUser);
        
        // 비밀번호 암호화
        const hashPassword = await bcrypt.compare(password, exUser[0].password);

        if (exUser[0].email === email){  // 1. 아이디 비교
            if(hashPassword){    // 2. 비밀번호 비교
                return done(null, exUser, {"isSuccess":true, message: "로그인 성공"})       // 성공하면 유저 정보를 passport.authenticate(err, user, info) 로 넘겨준다.
            } else {
                return done(null, false, {"isSuccess":false, message: "Incorrect password!"});
            }
        } else {
            return done(null, false, {"isSuccess":false, message: "Incorrect email!!"})
        }
    }))
}  

        
        
        
        
        
        
        
        
        // for ( let i = 0; i < users.length; i++){
        //     const user = users[i]
        //     if (email === user.email){                                  // 1. 아이디 비교
        //         if(password === user.password){                         // 2. 비밀번호 비교
        //             return done(null, user, {message: "로그인 성공"})    // 성공하면 유저 정보를 passport.authenticate(err, user, info) 로 넘겨준다.
        //         } else {
        //             return done(null, false, {message: "Incorrect password!"});
        //         }
        //     } else {
        //         return done(null, false, { message: "Incorrect username!"});
        //     }
        // }
