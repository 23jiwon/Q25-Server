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
    console.log("----------------------dao전")
    const Collection = await recordDao.SelectCollection(connection, userIdx); 
    connection.release();
    console.log("provider에서 collection:", Collection)
    return Collection;
};

exports.getQlistRows = async function(connection, userIdx) {

    const Qlist = await recordDao.SelectQlist(connection, userIdx); 

    return Qlist;
};

