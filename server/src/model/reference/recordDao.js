
// 질문, 답변가져오기 (답은 null일수도있음)
async function SelectQuestion(connection, email,qnum) {
    const selectQuestion = `
        SELECT *
        FROM christmas25.questiontbl
        WHERE questionIdx = ?
    `;
    const [selectquestionRow] = await connection.query(
        selectQuestion,
        qnum
    );
//DB수정해서 IDX 없애고 이메일넣던가해야함
    const selectAnswer = `
    SELECT answer
    FROM christmas25.pagetbl
    WHERE questionIdx = ? AND userIdx = ? 
    `;
    const [selectAnswerRow] = await connection.query(
        selectAnswer,
        [qnum,
         email]
    );


    let selectQARow= {selectquestionRow, selectAnswerRow };

    return selectQARow;
}

module.exports = {
    SelectQuestion,
};