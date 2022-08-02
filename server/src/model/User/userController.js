// controller에서는 형식적 validation 처리

const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const userService = require("../User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

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

   // TODO : 이메일 형식 체크
   /*
   if (!regexEmail.test(email)) {
     return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
   }
   */
   // TODO : 비밀번호 형식적 validation 필요?

   const signUpResponse = await userService.createUser(
        nickName,
        email,
        password
   );

   return res.send(signUpResponse);
}

exports.login = async function (req, res) {
     console.log("로그인시작");
     
     
     /**
      * Body: email, password,
      */
     const { email, password } = req.body;
     console.log(email, password);
 
     if (!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_WRONG));

     if (!password) {
         return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
     }
 
     const signInResponse = await userService.postSignIn(email, password);
 
     return res.send(signInResponse);
 };