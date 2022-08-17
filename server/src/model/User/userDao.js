const { USER_USEREMAIL_EMPTY } = require('../../../config/baseResponseStatus');

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        INSERT INTO usertbl(nickName, email, password)
        VALUES (?, ?, ?);
    `;
    
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 이메일로 회원 조회. 회원가입 시 중복된 이메일 확인용
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
        SELECT nickName
        FROM userTBL
        WHERE email = ?;
    `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);

    return emailRows;
}

async function selectUserPassword(connection, email){

    const selectUserPasswordQuery=`
        SELECT password
        FROM christmas25.usertbl
        WHERE email = ? ;
        `
    const [selectUserPassword] = await connection.query(selectUserPasswordQuery,email)
    return selectUserPassword;
}


//로그인 이메일 확인
async function selectLoginEmail(connection, email) {
    const selectLoginEmailQuery = `
        SELECT email
        FROM userTBL
        WHERE email = ?;
    `;
    const [emailRows] = await connection.query(selectLoginEmailQuery, email);
    if(emailRows.length > 0){
    }
    else{
        let i = {email : null }
        emailRows.push(i);
    }
    return emailRows;
}

//토큰
async function selectaccount(connection, email){

    const selectaccountQuery=`
        SELECT userIdx, userStatus
        FROM christmas25.usertbl
        WHERE email = ?
        `
    const [selectaccountRows] = await connection.query(selectaccountQuery,email)
    return selectaccountRows;
}

async function seletUserToken(connection, userIdx){

    const seletUserTokenQuery=`
        SELECT tokenIdx
        FROM christmas25.tokentbl
        WHERE userIdx = ?
        `
    const [seletUserToken] = await connection.query(seletUserTokenQuery,userIdx)
    return seletUserToken;
}

//토큰 저장
async function InsertUserToken(connection, userIdx, tokenIdx){

    const InsertUserTokenQuery=`
        INSERT INTO tokentbl(tokenIdx, userIdx)
        VALUES (?, ?);
        `
    const [insertUserToken] = await connection.query(InsertUserTokenQuery,[tokenIdx, userIdx])
    return insertUserToken;
}


//비밀번호 변경
async function InsertPw(connection, userIdx, old_pw, new_pw){
    const selectOldPwQuery=`
        Select password as old_pw
        FROM christmas25.usertbl
        WHERE userIdx = ?
        `;
    const [selectOld] = await connection.query(selectOldPwQuery,[userIdx])

    if(old_pw != selectOld[0].old_pw){
        let i = { old_pw : null }
        return i
    }

    const InsertPwQuery=`
        UPDATE christmas25.usertbl
        SET password = ?
        WHERE userIdx=?
        `;
    const [insertPw] = await connection.query(InsertPwQuery,[new_pw, userIdx])

    const selectNewPwQuery=`
        Select password as new_pw
        FROM christmas25.usertbl
        WHERE userIdx = ?
        `;
    const [selectNewPw] = await connection.query(selectNewPwQuery,[userIdx])
    
    return selectNewPw;
}

async function updatePw(connection, randomPassword, nickName) {
    const updatePwQuery = `
        UPDATE christmas25.usertbl
        SET password = ?
        WHERE nickName = ?;
    `;
    const updatePwRow = await connection.query(updatePwQuery, [randomPassword, nickName]);
    return updatePwRow;
}



//계정 존재여부 확인
async function accountCheck(connection, email, password) {
    const accountCheckQuery = `
        SELECT userIdx
        FROM usertbl
        WHERE email = ? AND password = ?;
    `;
    const accountCheckRows = await connection.query(accountCheckQuery, [email, password]);
    return accountCheckRows;
}

async function withdrawAccount(connection, userIdx) {
    const withdrawAccountQuery = `
        UPDATE usertbl
        SET userStatus = 'INACTIVE'
        WHERE userIdx = ?;
    `;
    const withdrawAccoutRows = await connection.query(withdrawAccountQuery, userIdx);
    return withdrawAccoutRows;
}


//로그아웃
async function deletetoken(connection, userIdx){
    const deletetokenQuery = `
        DELETE FROM christmas25.tokentbl
        WHERE userIdx = ?;
    `;

    const tokenrRow = await connection.query(deletetokenQuery, userIdx);
    let res = "성공";
    return res;
};


async function checkStatus(connection, email) {
    const checkStatusQuery = `
        SELECT userStatus
        FROM usertbl
        WHERE email = ?
    `;
    const checkStatusQueryRow = await connection.query(checkStatusQuery, email);
    return checkStatusQueryRow;
}
module.exports = {
    insertUserInfo,
    selectUserEmail,
    selectUserPassword,
    selectaccount,
    seletUserToken,
    InsertUserToken,
    selectLoginEmail,
    InsertPw,
    updatePw,
    accountCheck,
    withdrawAccount,
    deletetoken,
    checkStatus
};