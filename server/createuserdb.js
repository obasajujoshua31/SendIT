import { Pool } from 'pg';
import database from './database';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool();

const addDataToUser1 = async () => {
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
};

const addDataToUser2 = async () => {
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
};

(async () => {
  const client = await pool.connect();

  try {
    const sql =
      'CREATE TABLE users(user_id serial PRIMARY KEY, email VARCHAR (255) NOT NULL, password VARCHAR (255) NOT NULL,  first_name VARCHAR (255) NOT NULL, last_name VARCHAR (255) NOT NULL, is_admin BOOLEAN NOT NULL, registered_on DATE);';
    const results = await client.query(sql);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  addDataToUser1();
  addDataToUser2();
})();
