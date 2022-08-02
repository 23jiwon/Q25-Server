// controller에서는 형식적 validation 처리

const jwtMiddleware = require("../../../config/jwtMiddleware");
const recordProvider = require("../reference/recordProvider");
const recordService = require("../reference/recordService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/*
    API NO.0
    API Name : Test API
    [GET] /members/test
    이메일, 질문번호를 주면 질문번호, 질문내용, 질문이미지, 답변 
*/
exports.getQuestion = async function (req,res) {
    /*
        body : email, qnum
    */
   const { email, qnum } = req.body;
   const getQuestionResponse = await recordService.getQuestion(
    email,
    qnum
    );

    return res.send(getQuestionResponse);
};

exports.postRecord = async function (req,res) {
    /*
        body : nickName, email, password
    */
   const { email, qnum, content } = req.body;
   console.log( email, qnum, content) // 정보 넘어옴

    return res.send(response(baseResponse.SUCCESS));
};

