const passport = require('passport');
const local = require('./localStrategy');

module.exports = (USERS) => {
    passport.serializeUser((user, done)=>{
        done(null, user.email); // session 에 passport 객체 생성 및 email 값을 추가
      });
      
    passport.deserializeUser((email, done)=>{   // 인증 후, 페이지 접근시 마다 사용자 정보를 Session 에서 읽어온다.
        console.log("deserializeUser : ", email);
        for (let i = 0; i < USERS.length; i++) {
            const user = USERS[i];
            if (user.email === email) {
                done(null, user);
            }
        }
    });
    
    local(USERS);
}