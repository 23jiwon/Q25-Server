// create, update, delete 등 조회 이외의 작업 처리
const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/database");

const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");


// 회원가입 api 관련
exports.createUser = async function (nickName, email, password) {
    try{
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if(emailRows.length > 0) {
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        }

        // 비밀번호 암호화
        // TODO : 수정 예정
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        const insertUserInfoParams = [nickName, email, password];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);         
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err){
        logger.error(`createUser Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


//마카 
exports.postSignIn = async function (email, password) {
    try {
        const emailRows = await userProvider.emailCheck(email); //이메일 확인

        if (emailRows[0].email != email) {
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }
        console.log("이메일맞음");

        const passwordRows = await userProvider.passwordCheck(email);

        if (passwordRows[0].password != password) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        console.log("이메일",emailRows[0].email, passwordRows)
        /*
        const userAccountRows = await userProvider.accountCheck(email);

        if (userAccountRows[0].status == "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userAccountRows[0].status == "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }
        */
/*
        let token = jwt.sign(
            { userIdx: userAccountRows[0].userIdx },
            secret_config.jwtsecret,
            { expiresIn: "365d", subject: "User" }
        );
*/

        let token = "임시토큰";
        return response(baseResponse.SUCCESS, token);
    } catch (err) {
        console.log(`App - postSignIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

