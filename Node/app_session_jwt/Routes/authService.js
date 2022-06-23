const authProvider = require('./authProvider');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config({path:'./.env'});

module.exports.createUser = async (email, password, name)=>{
    try{
        // 비밀번호 암호화
        const hashPassword = await bcrypt.hash(password, 12);

        // 유저 중복
        const userRows = await authProvider.userList([email, hashPassword]);
        if(userRows.length >= 1) return console.log('아이디 중복입니다.');    // logger
       
        // 유저 생성
        const userInsertResult = await authProvider.createUser([email, hashPassword, name]);
        if (userInsertResult.insertId) {    
            return {"isSuccess": "success", "email":email, "name":name, "insertId":userInsertResult.insertId};
        } else {
            return console.log('실패했습니다.');
        }
    } catch (error) { 
        console.log(error);
    }
}


module.exports.loginUser = async(email, password)=>{
    try{
        // 유저 아이디 중복 확인
        const returnId = await authProvider.localUser(email);
        if(returnId.length <= 0) return console.log('아이디가 틀렸습니다.');    // logger 필요

        // 비밀번호 확인
        const returnPassword = await authProvider.localUser(email);
        const match = await bcrypt.compare(password, returnPassword[0].password);
        console.log("bcrypt 결과: ", match)
        
        if(match){
            // create AccessToken
            const accessToken = jwt.sign(
                {   // payload
                    "email": returnId[0].email,
                    "name": returnId[0].name,
                    "auth": undefined
                },
                process.env.ACCESS_TOKEN_SECRET, //
                {

                }
            )
            // create RefreshToken
            const refreshToken = jwt.sign(

            )

        } else {
            return console.log('비밀번호가 틀렸습니다.');
        }



    } catch (error) {
        console.log(error);
    }
}



// ------------------------------------ memo ---------------------------------
// try{
//     // 비밀번호 암호화
//     const hashPassword = await bcrypt.hash(password, 12);

//     // 이메일 확인
//     const returnId = await authProvider.checkUserId([email, hashPassword]);
//     console.log("Id :", returnId);

//     if (returnId.length >= 1) return console.log('이메일이 틀렸습니다.')
    
//     // 비밀번호 확인
//     const returnPassword = await authProvider.checkUserPassword([email, hashPassword]);
    
    
//     console.log("password: ", returnPassword);

//     if (returnPassword.length >= 1) return console.log('비밀번호가 틀렸습니다.')

//     return {"isSuccess": "success", "email":email, "message":"로그인 성공했습니다."};

// } catch (error) {
//     console.log(error);
// }