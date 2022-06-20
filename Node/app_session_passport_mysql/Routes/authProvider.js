const pool = require("../middleware/Database/database");
const userDao = require("./authDao");

module.exports.userList = async (userInfo)=>{

    const connection = await pool.getConnection(async (conn) => conn);
    const Result = await userDao.selectUserList(connection, userInfo);
    connection.release();

    return Result;
};

module.exports.createUser = async (userInfo)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    const Result = await userDao.postUser(connection, userInfo);
    connection.release();

    return Result;
};
