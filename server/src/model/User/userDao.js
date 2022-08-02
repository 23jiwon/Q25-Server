
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

//마카
// 이메일로 회원 조회. 회원가입 시 중복된 이메일 확인용
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
        SELECT nickName, email
        FROM userTBL
        WHERE email = ?;
    `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);

    return emailRows;
}


async function selectUserPassword(connection, email){

    console.log("비밀번호 조회 시작")

    const selectUserPasswordQuery=`
        SELECT password
        FROM christmas25.usertbl
        WHERE email = ? ;
        `
    const [selectUserPassword] = await connection.query(selectUserPasswordQuery,email)
    return selectUserPassword;
    //console.log(query);
    /*
    db.query(selectUserPasswordQuery ,[password], (err, data)=>{
        if(err) {
            console.log("조회 실패", err);
            reject(err);
        }
        else {
            console.log("조회 성공");
            resolve(data);
        }
    })
    */

}

module.exports = {
    insertUserInfo,
    selectUserEmail,
    selectUserPassword,
};