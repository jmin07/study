// 유저 조회  
module.exports.selectUserList = async (connection, userInfo)=>{
    const selectUserListQuery = `
        SELECT email, password
        FROM users
        WHERE email = ? AND password = ?;
    `;

    const [userList] = await connection.query(selectUserListQuery, userInfo);
    
    return userList;
};

// 유저 아이디 조회
module.exports.selectUserId = async (connection, userInfo)=>{
    const selectUserIdQuery = `
        SELECT email
        FROM users
        WHERE email = ? AND password = ?;
    `;

    const [userId] = await connection.query(selectUserIdQuery, userInfo);
    
    return userId;
};

// 유저 비밀번호 조회
module.exports.selectUserPassword = async (connection, userInfo)=>{
    const selectUserListQuery = `
        SELECT password
        FROM users
        WHERE email = ? AND password = ?;
    `;

    const [userPassword] = await connection.query(selectUserListQuery, userInfo);
    
    return userPassword;
};

// 유저 생성
module.exports.postUser = async (connection, userInfo)=>{
    const insertUserQuery = `
        INSERT INTO users(email, password, name)
        VALUES (?, ?, ?);
    `;

    const [insertUser] = await connection.query( insertUserQuery, userInfo, (error, result)=>{ 
        if(error) throw error;
    });

    return insertUser;
};