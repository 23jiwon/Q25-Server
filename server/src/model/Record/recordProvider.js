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

exports.getCollection = async function(userIdx) {

    const connection = await pool.getConnection(async (conn) => conn);
    const Collection = await recordDao.SelectCollection(connection, userIdx); 
    connection.release();

    return Collection;
};

exports.getQlistRows = async function(userIdx) {

    const connection = await pool.getConnection(async (conn) => conn);
    const Qlist = await recordDao.SelectQlist(connection, userIdx); 
    connection.release();

    return Qlist;
};

