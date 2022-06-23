const pool = require("../Database/database");
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

module.exports.checkUserId = async (userInfo)=> {
    const connection = await pool.getConnection(async (conn) => conn);
    const Result = await userDao.selectUserId(connection, userInfo);
    connection.release();

    return Result;
}

module.exports.checkUserPassword = async (userInfo)=> {
    const connection = await pool.getConnection(async (conn) => conn);
    const Result = await userDao.selectUserPassword(connection, userInfo);
    connection.release();

    return Result;
}

module.exports.localUser = async (userInfo)=> {
    const connection = await pool.getConnection(async (conn) => conn);
    const Result = await userDao.LocalStrategyUser(connection, userInfo);
    connection.release();

    return Result;
}
