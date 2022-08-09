module.exports = function(app) {
    const record = require("./recordController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    

    
    // 3. record API

    //질문정보가져오기 
    app.get('/api/members/qnapage', record.getQuestion);

    //답변저장
    app.patch('/api/members/useranswer', record.patchRecord);


};