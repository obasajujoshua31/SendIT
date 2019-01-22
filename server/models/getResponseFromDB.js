import pool from '../config/config';
/**
 * @param  {String} sql
 * @param  {Array} params
 * @return  {Array} getResponseFromDB
 */
const getResponseFromDB = async (sql, params = null) => {
  try {
    const response = await pool.query(sql, params);
    return response.rows;
  } catch (e) {
    throw e;
  }
};
export default getResponseFromDB;
