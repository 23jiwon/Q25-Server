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
const schedule = require("node-schedule");

// 선물상자 누르면 보내줄 정보 - email qnum은 다른걸로 바꾸기
exports.getQuestion = async function (userIdx,questionIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    // 이메일에 있는 질문 번호 가져오기
    try{
    //     let userQIdx = await recordDao.getUserQIdx(connection, userIdx, questionIdx);
    //      userQIdx = userQIdx[0][0].userQIdx
        const questionRows = await recordProvider.getQuestion(userIdx,questionIdx);
        console.log(questionRows)

        return response(baseResponse.SUCCESS,questionRows);
    } catch (err){
        logger.error(`getQuestion Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

// 답변 작성시 저장해야할 정보
exports.patchRecord = async function (answer,userIdx,qNum) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{ 
        const recordRows = await recordProvider.patchRecord(answer,userIdx,qNum);

        
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
        const connection = await pool.getConnection(async (conn) => conn);

        const getQlistRows = await recordProvider.getQlistRows(connection, userIdx);
        connection.release();


        return response(baseResponse.SUCCESS, getQlistRows);

    } catch (err){
        logger.error(`getQlist Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};

// opened 일괄 변경
module.exports = {
    updateOpened: () => {
        schedule.scheduleJob('30 * * * * *', async()=>{
            const connection = await pool.getConnection(async (conn) => conn);

            let today_date  = new Date();
            today_date = today_date.getDate();

            const updateQuestionList = [];
            for(var i=1; i<26; i++){
                if (i<=today_date){
                    updateQuestionList.push(i);
                }
            }
            // console.log("updateQuestionList:", updateQuestionList);
            for(var qnum in updateQuestionList){
                const updateOpenStatusResult = await recordDao.updateOpenStatus(connection, qnum+1);
            }
            console.log("opened update 완료")
            
            //
            connection.release();
        });
        // updateOpened.cancel(); //schedule 취소
        }
}

