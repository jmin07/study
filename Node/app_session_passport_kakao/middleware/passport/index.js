const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const authProvider = require('../../Routes/authProvider');

module.exports = () => {
    passport.serializeUser((user, done)=>{
        console.log("serializeUser: ", user);
        return done(null, user[0].email); // session 에 passport 객체 생성 및 email 값을 추가
      });
      
    passport.deserializeUser(async (user, done)=>{   // 인증 후, 페이지 접근시 마다 사용자 정보를 Session 에서 읽어온다.
        console.log("deserializeUser: ", user);
    
        const users = await authProvider.checkUserId([user]); // 이메일 검증
        console.log("returnUserId: ", users);
        console.log("returnUserId: ", users.length);

        if (users.length >= 1){ 
            done(null, users);
        }
    })

    local();
    kakao();
}