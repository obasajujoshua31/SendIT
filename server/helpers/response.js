/**
 * @param  {Array} data
 * @param  {String} message
 * @param  {number} statusCode
 * @param  {ServerResponse} res
 * @return {ServerResponse} sendResponse
 */
const sendResponse = (data, message, statusCode, res) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};
/**
 * @param  {String} token
 * @param  { String} message
 * @param  {Number} statusCode
 * @param  {ServerResponse} res
 * @return  {ServerResponse} sendAuthResponse
 */
export const sendAuthResponse = (
  token,
  message,
  statusCode,
  res,
  user = null
) => {
  return res.status(statusCode).json({
    success: true,
    token,
    message,
    user,
  });
};
export default sendResponse;
