// create, update, delete 등 조회 이외의 작업 처리
const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/database");

const recordProvider = require("./recordProvider");
const recordDao = require("./recordDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Console } = require("console");


// 선물상자 누르면 보내줄 정보 - email qnum은 다른걸로 바꾸기
exports.getQuestion = async function (userIdx,qNum) {
    try{
        // 이메일에 있는 질문 번호 가져오기
        const questionRows = await recordProvider.getQuestion(userIdx,qNum);
        const connection = await pool.getConnection(async (conn) => conn);
        connection.release();

        console.log(questionRows)
        return response(baseResponse.SUCCESS,questionRows);

    } catch (err){
        logger.error(`getQuestion Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 답변 작성시 저장해야할 정보
exports.patchRecord = async function (answer,userIdx,qNum) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{ 
        const recordRows = await recordProvider.patchRecord(answer,userIdx,qNum);

        //시간 비교
        const currentTime = new Date();
        console.log(`current Date : ${currentTime}`);
        const timeCriteria = await recordDao.getTimeCriteria(connection, qNum);

        if (timeCriteria >= currentTime){
            const updateOpenStatusResult = await recordDao.updateOpenStatus(connection, userQIdx);
        }
        connection.release();

        return response(baseResponse.SUCCESS, recordRows);


    } catch (err){
        logger.error(`patchRecord Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally{
        connection.release();
    }
};


// 회원답변정보가져오기
exports.getCollection = async function (userIdx) {
    try{
        // 이메일에 있는 질문 번호 가져오기
        const CollectionRows = await recordProvider.getCollection(userIdx);
        const connection = await pool.getConnection(async (conn) => conn);
        connection.release();


        return response(baseResponse.SUCCESS, CollectionRows);

    } catch (err){
        logger.error(`getCollection Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};

//질문리스트
exports.getQlist = async function (userIdx) {
    try{
        // 선물상자 25개 출력
        const getQlistRows = await recordProvider.getQlistRows(userIdx);
        const connection = await pool.getConnection(async (conn) => conn);
        connection.release();


        return response(baseResponse.SUCCESS, getQlistRows);

    } catch (err){
        logger.error(`getQlist Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};