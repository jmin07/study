const authProvider = require('./authProvider');
const bcrypt = require('bcrypt');

module.exports.createUser = async (email, password, name)=>{
    try{
        // 유저 중복
        const userRows = await authProvider.userList([email, password]);
        if(userRows.length >= 1) return console.log('아이디 중복입니다.');    // logger
       
        // 비밀번호 암호화
        const hashPassword = await bcrypt.hash(password, 12);

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