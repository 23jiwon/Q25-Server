
// 질문, 답변가져오기 (답은 null일수도있음)
async function SelectQuestion(connection, userIdx,qNum) {
    const selectQuestion = `
        SELECT questionIdx as qNum, content as qnacontent, CONCAT('http://localhost:5000/christmasQ25_asset/', questionImg) as qnaImg
        FROM christmas25.questiontbl
        WHERE questionIdx = ?
    `;
    const [selectquestionRow] = await connection.query(
        selectQuestion,
        qNum
    );
//DB수정해서 IDX 없애고 이메일넣던가해야함
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

    /*
    question:
            {
            qNum : ”1”,
            qnalmg: ””,
            qnacontent:” ”
            }

    */
 
    let selectQARow = {
        question : 
        {
        qNum:selectquestionRow[0].qNum,
        qnaImg: selectquestionRow[0].qnaImg,
        qnacontent:selectquestionRow[0].qnacontent
        }
        }


    return selectQARow;
}

// 답 저장하기
async function InsertAnswer(connection,answer,userIdx,qNum) {


    const insertAnswerQuery = `
    SELECT questionIdx, answer
    FROM christmas25.pagetbl
    WHERE userIdx = ? 
    `;
    
    const insertAnswetRow = await connection.query(
        insertAnswerQuery,
        userIdx
    );

    return insertAnswetRow;
}


    const insertAnswerQuery = `
    SELECT questionIdx, answer
    FROM christmas25.pagetbl
    WHERE userIdx = ? 
    `;
    
    const insertAnswetRow = await connection.query(
        insertAnswerQuery,
        userIdx
    );

    return insertAnswetRow;
}

<<<<<<< HEAD
// 답 저장하기
async function InsertAnswer(connection, userIdx, qNum) {
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

    let AnswerRow = {
        isSuccess:
        {
        qNum:selectQuestionRow[0].qNum,
        qnaImg: selectQuestionRow[0].qnaImg,
        qnacontent:selectQuestionRow[0].qnacontent,
        answerY_N : selectYN,
        answer : selectAnswerRow[0].answer
        },
        message: "성공"     
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

//기준 기간 가져오기
async function getTimeCriteria(connection, questionIdx){
    const getTimeCriteriaQuery = `
        SELECT openTime
        FROM questionTBL
        WHERE questionIdx = ?;
    `;

    const TimeCriteria = await connection.query(getTimeCriteria, questionIdx);
    return TimeCriteria;
};

//시간 돼서 질문 열리면 opened=1로 변경
async function updateOpenStatus(connection, userQIdx) {
    const updateOpenStatusQuery = `
        UPDATE pageTBL
        SET opened = '1'
        WHERE userQIdx = ?;
    `;

    const updateOpenStatusRow = await connection.query(updateOpenStatusQuery, userQIdx);

    return updateOpenStatusRow[0];
};

module.exports = {
    SelectQuestion,
    InsertAnswer,
    addNewRows,
    getTimeCriteria,
    updateOpenStatus
};