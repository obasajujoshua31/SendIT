import pool from '../config/config';

const getResponseFromDB = (sql, params = null, callback = null) => {
  return pool
    .query(sql, params)
    .then(results => {
      callback(results.rows);
    })
    .catch(err => {
      console.log(err);
    });
};

export default getResponseFromDB;
