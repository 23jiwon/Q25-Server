module.exports = function(app) {
    const record = require("./recordController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    

    
    // 3. record API
    app.get('/members/record', record.getQuestion);
    app.post('/members/record', record.postRecord);

};