// express Framework 설정 파일
const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended : true}));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/model/User/userRoute')(app);

    //마카 - 질문 출력, 작성, 수정 
    require('../src/model/Record/recordRoute')(app); 
    //require('../src/app/Post/postRoute')(app);
    // require('../src/app/Board/boardRoute')(app);

    return app;
};