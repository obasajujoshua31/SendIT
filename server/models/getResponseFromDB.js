import pool from '../config/config';

const getResponseFromDB = (sql, params = null, callback = null) => {
  pool.connect();
  return pool
    .query(sql, params)
    .then(results => {
      callback(results.rows);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

export default getResponseFromDB;
