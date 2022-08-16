module.exports = function(app) {
    const user = require("./userController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    
    // 0. test API
    app.get('/api/members/test', user.getTest);

    // 1. 회원가입 API
    app.post('/api/members/signup', user.postUsers);

    // 2.1 일반로그인 API
    app.post("/api/members/login", user.login);

    // 비밀번호 발송 API
    app.post('/api/members/pw', user.sendTempPw);
<<<<<<< HEAD
=======

    // 비밀번호 변경 API
    app.patch('/api/members/pw', user.patchPw);

>>>>>>> 11b1307a5565b9bbf3729b06a915e785552685e6

};