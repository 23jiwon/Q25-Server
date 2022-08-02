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


// 회원가입 api 관련
exports.getQuestion = async function (email, qnum) {
    try{
        // 이메일에 있는 질문 번호 가져오기
        console.log("서비스시작");
        const questionRows = await recordProvider.getQuestion(email,qnum);

        console.log(questionRows);
        const connection = await pool.getConnection(async (conn) => conn);
        connection.release();

        return response(baseResponse.SUCCESS, questionRows);

    } catch (err){
        logger.error(`getQuestion Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

