import pool from '../config/config';

const getResponseFromDB = async (sql, params = null, callback = null) => {
  let error, response;
  try {
    return await pool.query(sql, params).then(results => {
      response = results.rows;
    });
  } catch (e) {
    error = new Error(e);
  } finally {
    callback(error, response);
  }
};

export default getResponseFromDB;
