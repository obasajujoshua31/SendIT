import { Client } from 'pg';

const getResponseFromDB = (sql, params = null, callback = null) => {
  const client = new Client();
  client.connect();
  return client
    .query(sql, params)
    .then(results => {
      callback(results.rows);
    })
    .catch(err => {
      console.log(err);
    });
};

export default getResponseFromDB;
