/**
 * @param  {String} message
 * @param  {number} statusCode
 * @param  {ServerResponse} next
 * @return {ServerResponse} handleError

 */
const handleError = (message, statusCode = null, next) => {
  const error = new Error();
  error.message = message;
  error.statusCode = statusCode;

  return next(error);
};
export default handleError;
