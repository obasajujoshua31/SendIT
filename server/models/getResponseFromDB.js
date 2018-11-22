import client from '../config/config';

const getResponseFromDB = (sql, params = null, callback = null) => {
  client.connect();
  return client
    .query(sql, params)
    .then(results => {
      callback(results.rows);
      client.end();
    })
    .catch(err => {
      console.log(err);
      client.end();
    });
};

export default getResponseFromDB;
