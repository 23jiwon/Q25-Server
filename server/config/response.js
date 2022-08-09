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
   
   module.exports = { response, errResponse, resreturn };