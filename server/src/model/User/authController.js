//authController.js
/**
 * API No. 2.1
 * API Name : 로그인 API
 * [POST] /members/login
 */

 const jwtMiddleware = require("../../../config/jwtMiddleware");
 const userProvider = require("../User/userProvider");
 const authService = require("../User/authService");
 const baseResponse = require("../../../config/baseResponseStatus");
 const {response, errResponse} = require("../../../config/response");

 exports.login = async function (req, res) {

    /**
     * Body: email, password,
     */
    const { email, password } = req.body;

    if (!email) return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
    // 길이 체크
    else if (email.length > 30)
        return res.send(errResponse(baseResponse.SIGNUP_EMAIL_LENGTH));
    // 형식 체크 (by 정규표현식)
    //else if (!regexEmail.test(email))
    //    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    if (!password) {
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
    } else if (password.length < 8) {
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
    } 
    // else if (regexPwd.test(password)) {
    //     return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
    // }

    const signInResponse = await authService.postSignIn(email, password);

    return res.send(signInResponse);
};
