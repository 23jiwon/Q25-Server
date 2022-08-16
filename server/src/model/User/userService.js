// create, update, delete 등 조회 이외의 작업 처리
const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/database");

const userProvider = require("./userProvider");
const userDao = require("./userDao");
const recordDao = require("../Record/recordDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse, resreturn } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const express = require('express');
require("dotenv").config();
const secretkey=process.env.JWT_SECRET_KEY;

// 회원가입
exports.createUser = async function (nickName, email, password) {
    try{
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        console.log("emailRows:", emailRows);
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

        //추가된 회원에게 25개 질문 할당
        for (var i=1; i<26; i++){
            const addNewRowsParams = [userIdResult[0].insertId, i];
            const addNewRowsResult = await recordDao.addNewRows(connection, addNewRowsParams);
        }
        console.log(`${userIdResult[0].insertId}번 회원의 질문이 생성되었습니다`);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err){
        logger.error(`createUser Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


//로그인 수정필요 + 로그아웃 만들어야함
exports.postSignIn = async function (email, password) {

    console.log(email, password)

    try {
        const emailRows = await userProvider.LoginCheck(email); //이메일 확인

        console.log(emailRows)
        if(emailRows === null){
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }
        if (emailRows[0].email != email) {
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }
        console.log("이메일확인끝")

        const passwordRows = await userProvider.passwordCheck(email);

        if (passwordRows[0].password != password) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        //console.log("이메일",emailRows[0].email, passwordRows)
        

        //일치하면 사용중인 회원인지 탈퇴한 회원인지 확인
        const userAccountRows = await userProvider.accountCheck(email);

        if (userAccountRows[0].userstatus === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } 

        let token = jwt.sign(
            { userIdx: userAccountRows[0].userIdx },
            secretkey,
            { expiresIn: "30d", subject: "User" }
        );

        //토큰 저장
        const savetoken = await userProvider.savetoken(userAccountRows[0].userIdx, token)

        let loginres = { AT : token , userIdx : userAccountRows[0].userIdx}

        return response(baseResponse.SUCCESS, loginres);
    } catch (err) {
        console.log(`App - postSignIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 랜덤 비밀번호 생성 함수
var variable = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,n,m,o,p,q,r,s,t,u,v,w,x,y,z".split(",");

function createRandomPassword(variable, pwlength){
    var randomString = "";
    for(var i=0; i<pwlength; i++){
        randomString += variable[Math.floor(Math.random()*variable.length)];
    }
    return randomString;

};
const randomPassword = createRandomPassword(variable, 8);

let transport = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    }
});


// 임시 비밀번호 발송
exports.sendPw = async function (userEmail) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        let mailOptions = {
            from : process.env.EMAIL_USER, //TODO : 팀 이름 결정되면 수정
            to : userEmail,
            subject : '[TEST] ChristmasQ25에서 임시 비밀번호를 알려드립니다',//TODO : 팀 이름 결정되면 수정
            html : `
            <h1>ChristmasQ25에서 임시 비밀번호를 알려드립니다.</h1><br>
            <h3> 임시 비밀번호 : `+randomPassword+`</h3>
            <br><h3>임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>
            `
        };// TODO : 멘트 변경

        console.log(`${userEmail}로 메일 발송을 시도합니다.`);
        console.log(`random password : ${randomPassword}`);

        const emailRows = await userProvider.emailCheck(userEmail);

        console.log(`발신인 : ${process.env.EMAIL_USER}`);
        if (emailRows.length > 0){
            console.log(`수신인 : ${emailRows[0].nickName}`);
            transport.sendMail(mailOptions, function(err, info) {
                if (err){
                    console.log(err);
                } else {
                    //console.log(info);
                }
            });
            return response(baseResponse.SUCCESS);
        } else {
            return errResponse(baseResponse.USER_USEREMAIL_NOT_EXIST);
        };
    } catch (err) {
        logger.error(`sendTmpPw Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally{
        connection.release();
    }
}

//비밀번호 변경
exports.patchPw = async function (userIdx, old_pw, new_pw) {
    const connection = await pool.getConnection(async (conn) => conn);
    const PwRows = await userProvider.InsertPw(userIdx, old_pw, new_pw);

    console.log(PwRows)
    if(PwRows.old_pw === null){
        return response(baseResponse.UPDATE_PW_WRONG);
    }
    try{

        return response(baseResponse.SUCCESS, PwRows);

    } catch (err) {
        logger.error(`patchPw Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}