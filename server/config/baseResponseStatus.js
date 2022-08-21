module.exports = {

    // Success
    SUCCESS : { "isSuccess": 1, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": 0, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": 0, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": 1, "code": 1001, "message":"JWT 토큰 검증 성공" }, 

    //Request error(형식적 validation error)
    // 회원가입 관련
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": 0, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": 0, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": 0, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": 0, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": 0,"code": 2007,"message":"닉네임은 최대 10글자입니다." }, //수정 완.
    SIGNUP_EMAIL_EMPTY : { "isSuccess": 0, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": 0, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },

    
    SIGNIN_EMAIL_EMPTY : { "isSuccess": 0, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": 0, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": 0, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": 0, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": 0, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": 0, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": 0, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": 0, "code": 2015, "message": "등록되지 않은 이메일입니다." },
    USER_ID_NOT_MATCH : { "isSuccess": 0, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": 0, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": 0, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    USER_USERIDX_EMPTY : { "isSuccess": 0, "code": 2019, "message": "userIdx를 입력해주세요." },
    USER_USERIDX_LENGTH : { "isSuccess": 0, "code": 2020, "message": "userIdx는 0보다 큰 값으로 입력해주세요." },

    POST_POSTIDX_EMPTY : { " isSuccess":0, "code" : 2021, "message": "postIdx를 입력해주세요. "},
    POST_CONTENT_EMPTY : { "isSuccess" : 0, "code" : 2022, "message": "게시물 내용을 작성해주세요."},
    POST_POSTIDX_LENGTH : { "isSuccess": 0, "code": 2023, "message" : "postIdx를 입력해주세요. "},
    POST_CONTENT_LENGTH : { "isSuccess": 0, "code": 2024, "message": "게시물 내용은 450자 미만으로 입력해주세요."},
    POST_STATUS_INACTIVE : {"isSuccess" : 0, "code": 2025, "message" : "이미 삭제된 게시물입니다. "},

    //비밀번호 변경관련
    UPDATE_PW_WRONG : {"isSuccess":false, "code" : 2026, "message": "비밀번호를 정확하게 입력해주세요." },


    // Response error(의미적 validation error)
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": 0, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": 0, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": 0, "code": 3003, "message": "이메일이 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": 0, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": 0, "code": 3005, "message": "탈퇴된 계정입니다. 고객센터에 문의해주세요." },
    //SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": 0, "code": 3006, "message": "탈퇴된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": 0, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": 0, "code": 4001, "message": "서버 에러"},
    SEND_TEMPPW_ERROR : { "isSuccess": 0, "code": 4002, "message": "메일 전송 에러"}
 
}
