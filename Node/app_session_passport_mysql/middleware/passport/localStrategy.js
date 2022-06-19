const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// 유저 정보 인증 전략 방법
module.exports = (users)=>{   // 함수에서 받을 유저 정보를 넘겨줘야한다.
    
    passport.use(new LocalStrategy({
        // 오버라이딩
        usernameField: 'email',     // req.body.email
        passwordField: 'password'   // req.body.password
    }, (email, password, done)=>{   // 로그인 하는 유저 정보가 들어온다.
        for ( let i = 0; i < users.length; i++){
            const user = users[i]
            if (email === user.email){                                  // 1. 아이디 비교
                if(password === user.password){                         // 2. 비밀번호 비교
                    return done(null, user, {message: "로그인 성공"})    // 성공하면 유저 정보를 passport.authenticate(err, user, info) 로 넘겨준다.
                } else {
                    return done(null, false, {message: "Incorrect password!"});
                }
            } else {
                return done(null, false, { message: "Incorrect username!"});
            }
        }
    }))
}