import pool from '../config/config';

const getResponseFromDB = async (sql, params = null, callback = null) => {
  const client = await pool.connect();
  const results = await client.query(sql, params);
  callback(results);
  client.end();
};

export default getResponseFromDB;
