// 질문, 답변가져오기 (답은 null일수도있음)
async function SelectQuestion(connection, userIdx,qNum) {
    
    const selectQuestion = `
        SELECT questionIdx as qNum, content as qnacontent, CONCAT('http://localhost:3001/christmasQ25_asset/', questionImg) as qnaImg
        FROM christmas25.questiontbl
        WHERE questionIdx = ?
    `;
    const [selectquestionRow] = await connection.query(
        selectQuestion,
        qNum
    );

//DB수정해서 IDX 없애고 이메일넣던가해야함 --- 이거 답변도 보내야하지않나? 물어봐야함
    const selectAnswer = `
    SELECT answer
    FROM christmas25.pagetbl
    WHERE questionIdx = ? AND userIdx = ? 
    `;
    const [selectAnswerRow] = await connection.query(
        selectAnswer,
        [qNum,
        userIdx]
    );

    let answer =[];
    if(selectAnswerRow[0].answer === null){
        let t = {answer : null};
        answer.push(t);
    }
    else if((selectAnswerRow[0].answer).length < 1){
        let t = {answer : null};
        answer.push(t);
    }
    else{
        let t = {answer : selectAnswerRow[0].answer};
        answer.push(t);
    }
    /*
    question:
            {
            qNum : ”1”,
            qnalmg: ””,
            qnacontent:” ”,
            answer:""
            }

    */
 
    let selectQARow = {
    qNum:selectquestionRow[0].qNum,
    qnaImg: selectquestionRow[0].qnaImg,
    qnacontent:selectquestionRow[0].qnacontent,
    answer:answer[0].answer
    }

    return selectQARow;
}


// 답 저장하기
async function InsertAnswer(connection, answer, userIdx, qNum) {
    const insertAnswerQuery = `
    UPDATE christmas25.pagetbl
    SET answer=?
    WHERE userIdx=? AND questionIdx=? 
    `;

    const insertAnswerRow = await connection.query(
        insertAnswerQuery,
        [answer,
        userIdx,
        qNum]
    );
    //답변 저장 성공

    /*
    {isSuccess:{
    qNum:”1”
    qnalmg: ””,
    qnacontent:””,
    answerY_N : 1,
    answer:””
    },
    message: “성공” }
    */
    //리턴값 설정
    const selectAnswerQuery = `
    SELECT answer
    FROM christmas25.pagetbl
    WHERE userIdx = ?  And questionIdx = ?
    `;
    const [selectAnswerRow] = await connection.query(
        selectAnswerQuery,
        [userIdx,
        qNum]
    );
    const selectQuestionQuery = `
    SELECT questionIdx as qNum , CONCAT('http://localhost:5000/christmasQ25_asset/', questionImg) as qnaImg, content as qnacontent
    FROM christmas25.questiontbl
    WHERE questionIdx = ?
    `;
    const [selectQuestionRow] = await connection.query(
        selectQuestionQuery,
        qNum,
    );


    let selectYN = 0
    if((selectAnswerRow[0].answer).length > 0){
        selectYN++;
    }

    let AnswerRow = 
        {
        qNum:selectQuestionRow[0].qNum,
        qnaImg: selectQuestionRow[0].qnaImg,
        qnacontent:selectQuestionRow[0].qnacontent,
        answerY_N : selectYN,
        answer : selectAnswerRow[0].answer
        }  
        

    return AnswerRow; 
}

//회원가입 시 db 추가
async function addNewRows(connection, addNewRowsParams){
    const addNewRowsQuery = `
        INSERT INTO pageTBL(userIdx, questionIdx)
        VALUES (?, ?);
    `;
    const addNewRowsRow = await connection.query(addNewRowsQuery, addNewRowsParams);

    return addNewRowsRow;
};

// 기준 기간 가져오기
// async function getTimeCriteria(connection, questionIdx){
//     const getTimeCriteriaQuery = `
//         SELECT openTime
//         FROM questionTBL
//         WHERE questionIdx = ?;
//     `;

//     const TimeCriteriaRow = await connection.query(getTimeCriteriaQuery, questionIdx);
//     return TimeCriteriaRow;
// };

// opened=1
async function updateOpenStatus(connection, qnum) {
    const updateOpenStatusQuery = `
        UPDATE pageTBL p, questiontbl q
        SET p.opened = '1'
        WHERE p.questionIdx = ?;
    `;

    const updateOpenStatusRow = await connection.query(updateOpenStatusQuery, qnum);
    
    return updateOpenStatusRow;
};

// async function getOpened(connection, userQIdx) {
//     const getOpenedQuery = `
//         SELECT opened
//         FROM pagetbl
//         WHERE userQIdx = ?;
//     `;
//     const getOpenedRows = await connection.query(getOpenedQuery, userQIdx);

//     return getOpenedRows
// }

//질문 모아보기 답변한것만
async function SelectCollection(connection, userIdx) {
    console.log("----------------이게왜 안나와???????????????userIdx :", userIdx);

    //질문정보
    const selectQuestion = `
        SELECT questionIdx as qNum, content as qnacontent, CONCAT('http://localhost:5000/christmasQ25_asset/', questionImg) as qnaImg
        FROM christmas25.questiontbl
    `;
    const [selectQuestionRow] = await connection.query(
        selectQuestion,
        userIdx
    );

    //답변정보
    const selectAnswer = `
    SELECT questionIdx as qNum, answer
    FROM christmas25.pagetbl
    WHERE userIdx = ? and answer is not null and answer != ''
    `;
    const [selectAnswerRow] = await connection.query(
        selectAnswer,
        userIdx
    );

    //답변이 있는 질문 모으기
    let newQ = []
    for(let i = 0 ; i < selectAnswerRow.length ; i++){
        let num = selectAnswerRow[i].qNum
        let t = {qnacontent : selectQuestionRow[num-1].qnacontent}
        newQ.push(t);
    }

    //유저 정보
    const selectUser = `
    SELECT nickName
    FROM christmas25.usertbl
    WHERE userIdx = ? 
    `;
    const [selectUserRow] = await connection.query(
        selectUser,
        userIdx
    );
    
    /*
        { nickName : “ “,
        question:
        {
        qNum : ”1”,
        qnacontent : “ “,
        answer : ” ” 
        },
      
    */

    //리턴값 
    let collection = []
    for(let i = 0 ; i < selectAnswerRow.length ; i++){
        let t = {
            qNum : selectAnswerRow[i].qNum,
            qnacontent : newQ[i].qnacontent,
            answer : selectAnswerRow[i].answer
        }
        collection.push(t);
    }
    // console.log("dao에서 collection :", collection);

    let selectCollectionRow = 
        {
        nickName : selectUserRow[0].nickName,
        question: collection
        }
        
    // console.log("dao에서 selectCollectionRow: ", selectCollectionRow)

    return selectCollectionRow;
}

//질문 리스트 25개
async function SelectQlist(connection, userIdx) {

    //질문정보
    const selectQuestion = `
        SELECT questionIdx as qNum, content as qnacontent, 
                CONCAT('http://localhost:3001/christmasQ25_asset/', questionImg) as qnaImg,
                CONCAT('http://localhost:3001/christmasQ25_asset/', boxImg) as boxImg
        FROM christmas25.questiontbl
    `;
    const [selectQuestionRow] = await connection.query(
        selectQuestion
    );

    //답변정보
    const selectAnswer = `
    SELECT questionIdx as qNum, opened, answer
    FROM christmas25.pagetbl
    WHERE userIdx = ?
    `;
    const [selectAnswerRow] = await connection.query(
        selectAnswer,
        userIdx
    );


    //유저 정보
    const selectUser = `
    SELECT nickName
    FROM christmas25.usertbl
    WHERE userIdx = ? 
    `;
    const [selectUserRow] = await connection.query(
        selectUser,
        userIdx
    );

    //이미지 정보
    const selectImg = `
    SELECT  CONCAT('http://localhost:5000/christmasQ25_asset', imageUrl) as stampImg 
    FROM christmas25.imagetbl
    WHERE imageIdx = 2
    `;//imageUrl에 /가 포함되어 있어 asset뒤의 / 지웠습니다
    const [selectImgRow] = await connection.query(
        selectImg
    );

    let selectYN = []
    for(let i = 0 ; i < 25 ; i++){
        if(selectAnswerRow[i].answer===null){
            let t = {answerY_N : 0}
            selectYN.push(t);
        }
        else if((selectAnswerRow[i].answer).length > 0){
            let t = {answerY_N : 1}
            selectYN.push(t);
        }
        else{
            let t = {answerY_N : 0}
            selectYN.push(t);
        }
    }
    
    /*
{ nickName: “ ”, 
  stampImg: “ “,
  question : {
  {
    qNum: “1”,
    boxImg: “06_gift01.png”,
    opened : 1,
    answerY_N : 1,
   },
  {
    qNum: “2”,
    boxImg: “06_gift02.png” ,
    opened : 1,
    answerY_N : 1,
   }
 }
}
      
    */

    //리턴값 
    let Qlist = []
    for(let i = 0 ; i < selectAnswerRow.length ; i++){
        let t = {
            qNum : selectAnswerRow[i].qNum,
            boxImg : selectQuestionRow[i].boxImg,
            opened : selectAnswerRow[i].opened,
            answerY_N : selectYN[i].answerY_N,
        }
        Qlist.push(t);
    }

    let selectCollectionRow = 
        {
        nickName : selectUserRow[0].nickName,
        stampImg: selectImgRow[0].stampImg,
        question: Qlist
        }

    return selectCollectionRow;
}


async function getUserQIdx(connection, userIdx, questionIdx) {
    // console.log("userIdx, questionIdx :", userIdx, questionIdx);
    const getUserQIdxQuery = `
        SELECT userQIdx
        FROM christmas25.pagetbl
        WHERE userIdx = ? and questionIdx = ?;
    `;
    const getUserQIdxRow = await connection.query(getUserQIdxQuery, [userIdx, questionIdx]);
    // console.log("getUserQIdxRow :", getUserQIdxRow);
    return getUserQIdxRow;
}


module.exports = {
    SelectQuestion,
    InsertAnswer,
    addNewRows,
    // getTimeCriteria,
    updateOpenStatus,
    // getOpened,
    SelectCollection,
    SelectQlist,
    getUserQIdx
};