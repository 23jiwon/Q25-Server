//authService.js
const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/database");

const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.postSignIn = async function (email, password) {
    try {
        const emailRows = await userProvider.emailCheck(email);
        
        if (emailRows.length < 1) {
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }
        // 암호화를 안함 암호화했다면 이걸로해야함
        // const hashedPassword = crypto
        // .createHash('sha512')
        // .update(passsword)
        // .digest('hex');

        // if (passwordRows[0].passsword != hashedPassword) {
        //     return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        // }

        const passwordRows = await userProvider.passwordCheck(email);

        if (passwordRows[0].password != password) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }
        /*
        const userAccountRows = await userProvider.accountCheck(email);

        if (userAccountRows[0].status == "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userAccountRows[0].status == "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }
        */

        let token = jwt.sign(
            { userIdx: userAccountRows[0].userIdx },
            secret_config.jwtsecret,
            { expiresIn: "365d", subject: "User" }
        );

        return response(baseResponse.SUCCESS, token);
    } catch (err) {
        console.log(`App - postSignIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


