// controller에서는 형식적 validation 처리

const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const userService = require("../User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse, resreturn } = require("../../../config/response");
// const regexEmail = require("regex-email");

/*
    API NO.0
    API Name : Test API
    [GET] /members/test
*/
exports.getTest = async function (req,res) {
    return res.send(response(baseResponse.SUCCESS));
};


/*
    API NO. 1
    API Name : 회원가입 API
    [POST] /members/signup
*/

exports.postUsers = async function (req, res) {
    /*
        body : nickName, email, password
    */
   const { nickName, email, password } = req.body;

   if(!nickName) {
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
   } else if(nickName.length > 10){
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
   }

   if(!email) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
   } else if(email.length > 30){
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
   }

   if(!password) {
          return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
     } else if(password.length > 30){
          return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
     }

   const signUpResponse = await userService.createUser(
        nickName,
        email,
        password
   );

   return res.send(signUpResponse);
};



exports.login = async function (req, res) {
     
     /**
      * Body: email, password,
      */
     const { email, password } = req.body;
 
     if (!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_WRONG));

     if (!password) {
         return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
     }
 
     const signInResponse = await userService.postSignIn(email, password);
 
     return res.send(signInResponse);
 };

 /*
     API No. ?
     API Name : 임시 비밀번호 발송 및 변경
     [POST] /members/pw 
*/
exports.sendTempPw = async function (req, res) {
    /*
         body : email //TODO: body값 수정된거 확인해야함!
    */
   const email = req.body.email;

   if(!email){
    return res.send(response(baseResponse.SIGNIN_EMAIL_EMPTY));
   }
   //TODO : 이메일 형식 체크?
//     if (!regexEmail.test(email))
//         return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

   const sendPwResponse = await userService.sendPw(email);

   return res.send(sendPwResponse);
};

exports.patchPw = async function (req, res) {
    /*
         body : email //TODO: body값 수정된거 확인해야함!
    */
    const { userIdx, old_pw, new_pw } = req.body;

   const patchPwResponse = await userService.patchPw(userIdx, old_pw, new_pw);
   return res.send(patchPwResponse);

};