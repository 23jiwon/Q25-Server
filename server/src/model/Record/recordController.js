// controller에서는 형식적 validation 처리

const jwtMiddleware = require("../../../config/jwtMiddleware");
const recordProvider = require("../Record/recordProvider");
const recordService = require("../Record/recordService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse, resreturn} = require("../../../config/response");

/*
    API NO.0
    API Name : Test API
    [GET] /members/record
    이메일, 질문번호를 주면 질문번호, 질문내용, 질문이미지, 답변 
*/
exports.getQuestion = async function (req,res) {
    /*
        body : {userIdx,qNum}
    */
   const {userIdx,qNum} = req.body;
   const getQuestionResponse = await recordService.getQuestion(
    userIdx,
    qNum
    );

    console.log(getQuestionResponse)

    return res.send(getQuestionResponse);
};

//저장
exports.patchRecord = async function (req,res) {
    /*
        body : answer,userIdx,qNum 
    */
   const { answer,userIdx,qNum  } = req.body;
   const patchRecordResponse = await recordService.patchRecord(
    answer,
    userIdx,
    qNum 
    );

    return res.send(patchRecordResponse)
    
};

//회원답변정보가져오기
exports.getInfo = async function (req,res) {
    /*
        body : userIdx, questionIdx
    */
   const { userIdx, questionIdx } = req.body;

   const getInfoResponse = await recordService.getInfo(
    userIdx, 
    questionIdx
    );

    return res.send(response(getInfoResponse));
};


