module.exports = function(app) {
    const user = require("./userController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    

    // 0. test API
    app.get('/members/test', user.getTest);

    // 1. 회원가입 API
    app.post('/members/signup', user.postUsers);

    // 2. 일반로그인 api
    // app.post("/members/login", user.login);
};
