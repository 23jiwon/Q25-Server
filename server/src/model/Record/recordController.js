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


//답변 모아보기
exports.getCollection = async function (req,res) {
    /*
        body : userIdx, questionIdx
    */
   const { userIdx } = req.body;

   const getCollectionResponse = await recordService.getCollection(
    userIdx, 
    );

    return res.send(getCollectionResponse);
};

//질문리스트
exports.getQlist = async function (req,res) {
    /*
        body : userIdx, questionIdx
    */
   const { userIdx } = req.body;

   const getQlistResponse = await recordService.getQlist(
    userIdx, 
    );

    return res.send(getQlistResponse);
};
