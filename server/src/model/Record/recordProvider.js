// provider : 조회작업 처리

const recordDao = require("./recordDao");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

exports.getQuestion = async function(userIdx,qNum) {
    const connection = await pool.getConnection(async (conn) => conn);
    const questionResult = await recordDao.SelectQuestion(connection, userIdx,qNum); 
    connection.release();

    return questionResult;
};

exports.patchRecord = async function(answer,userIdx,qNum) {

    const connection = await pool.getConnection(async (conn) => conn);
    const InsertResult = await recordDao.InsertAnswer(connection,answer,userIdx,qNum);  
    connection.release();

    return InsertResult;

};

exports.getInfo = async function(userIdx, questionIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Answer = await recordDao.SelectAnswer(connection, userIdx, questionIdx); 
    connection.release();

    return Answer;
};