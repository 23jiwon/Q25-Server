//authRoute.js

module.exports = function (app) {
    const auth = require("./authController");

    // 2.1 일반로그인 API
    
    app.post("/members/login", auth.login);
    console.log("로그인 시작")
};