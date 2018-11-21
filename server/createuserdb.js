import { Pool } from 'pg';
import database from './database';
const pool = new Pool();

const createUserTable = async callback => {
  const client = await pool.connect();

  try {
    const sql =
      'CREATE TABLE users(user_id serial PRIMARY KEY, email VARCHAR (255) NOT NULL, password VARCHAR (255) NOT NULL,  first_name VARCHAR (255) NOT NULL, last_name VARCHAR (255) NOT NULL, is_admin BOOLEAN NOT NULL);';
    const results = await client.query(sql);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  callback();
};

const addDataToUser1 = async callback => {
  const client = await pool.connect();
  try {
    const sql =
      'INSERT INTO users (email, password, first_name, last_name, is_admin) VALUES ($1, $2, $3, $4, $5)';

    const params = database.user1;
    const results = await client.query(sql, params);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  callback();
};

const addDataToUser2 = async callback => {
  const client = await pool.connect();
  try {
    const sql =
      'INSERT INTO users (email, password, first_name, last_name, is_admin) VALUES ($1, $2, $3, $4, $5)';

    const params = database.user2;
    const results = await client.query(sql, params);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  callback();
};

createUserTable(() => {
  addDataToUser1(() => {
    addDataToUser2(() => {});
  });
});
