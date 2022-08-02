// provider : 조회작업 처리

const userDao = require("./userDao");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

exports.emailCheck = async function(email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email); 
    connection.release();

    return emailCheckResult;
};
  
exports.passwordCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        email
    ); //이메일에 따른 비밀번호 확인
    connection.release();
    return passwordCheckResult;
  };

  