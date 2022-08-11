const response = ({isSuccess, code, message}, result) => {
    return {
         isSuccess: isSuccess,
         code: code,
         message: message,
         result: result
    }
   };
  
const errResponse = ({isSuccess, code, message}) => {
  return {
      isSuccess: isSuccess,
      code: code,
      message: message
    }
};

const resreturn =(result) =>{
  return result
}
   
<<<<<<< HEAD
   module.exports = { response, errResponse, resreturn };
=======
module.exports = { response, errResponse, resreturn };
>>>>>>> wendy2
