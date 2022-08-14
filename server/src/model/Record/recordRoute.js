module.exports = function(app) {
    const record = require("./recordController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    

    // 3. record API

    //질문정보가져오기 (답변 화면 불러오기)
    app.get('/api/members/qnapage', record.getQuestion);

    //답변저장
    app.patch('/api/members/useranswer', record.patchRecord);

    //질문리스트(답변한것만) 출력
    app.get(`/api/members/question/collection`, record.getCollection);

    //질문리스트
    app.get(`/api/members/question`, record.getQlist);

};