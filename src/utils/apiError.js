// class ApiError extends Error {
//     constructor(
//         statusCode,
//         message = 'Something went wrong',
//         errors = [],
//         stack
//     ){
//         super(message)
//         this.statusCode = statusCode
//         this.data = null,
//         this.message = message,
//         this.success = false,
//         this.errors = errors

//         if(stack){
//             this.stack = stack
//         } else {
//             Error.captureStackTrace(this, this.constructor)
//         }
//     }
// }

const createApiError = (statusCode, message = 'Something went wrong', errors = [], stack) => {
    const error = new Error(message);
    
    return {
        statusCode,
        message,
        errors,
        success: false,
        stack: stack || error.stack,
        data: null,
    };
}
export {createApiError}