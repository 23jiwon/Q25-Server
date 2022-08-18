// provider : 조회작업 처리

const userDao = require("./userDao");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

exports.emailCheck = async function(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email); 
  console.log("provider 에서 결과 : ", emailCheckResult);
  connection.release();

  return emailCheckResult;
};


exports.passwordCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      email
  );
  connection.release();
  return passwordCheckResult;
};

exports.getUserInfo = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getUserInfoResult = await userDao.selectUserInfo(
      connection,
      email
  );
  connection.release();
  return getUserInfoResult;
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const accountCheckesult = await userDao.selectaccount(
      connection,
      email
  );
  connection.release();
  return accountCheckesult;
};

exports.LoginCheck = async function(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const LoginCheckResult = await userDao.selectLoginEmail(connection, email); 
  connection.release();

  return LoginCheckResult;
};

exports.savetoken = async function(userIdx, tokenIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const savetokenResult = await userDao.InsertUserToken(connection, userIdx, tokenIdx); 
  connection.release();

  return savetokenResult;
};

exports.InsertPw = async function(userIdx, old_pw, new_pw) {
  const connection = await pool.getConnection(async (conn) => conn);
  const InsertPw = await userDao.InsertPw(connection, userIdx, old_pw, new_pw); 
  connection.release();

  return InsertPw;
};

exports.checkAccout = async function (email, password) {
  const connection = await pool.getConnection(async (conn) => conn);
  const checkAccoutResult = await userDao.accountCheck(connection, email, password);
  connection.release();
  return checkAccoutResult;
}

exports.logout = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const logoutResult = await userDao.deletetoken(connection, userIdx);
  connection.release();
  return logoutResult;
}

exports.checkStatus = async function(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const checkStatusResult = await userDao.checkStatus(connection, email);
  connection.release();
  return checkStatusResult;
}