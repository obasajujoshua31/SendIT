import { Pool } from 'pg';
import database from './database';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool();

const createParcelTable = async callback => {
  const client = await pool.connect();

  try {
    const sql =
      'CREATE TABLE parcels(parcel_id serial PRIMARY KEY, destination VARCHAR (255) NOT NULL, pick_up_location VARCHAR (255) NOT NULL, placed_by integer NOT NULL, sent_on DATE NOT NULL, weight_metric VARCHAR (255) NOT NULL, delivered_on DATE, weight VARCHAR (255) NOT NULL, status VARCHAR (255) NOT NULL, present_location VARCHAR (255));';
    const results = await client.query(sql);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  callback();
};

const addDataToParcel1 = async callback => {
  const client = await pool.connect();
  try {
    const sql =
      'INSERT INTO parcels (pick_up_location, destination, placed_by, weight, weight_metric, sent_on, status ) VALUES ($1, $2, $3, $4, $5, $6, $7)';

    const params = database.parcel1;
    const results = await client.query(sql, params);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  callback();
};

const addDataToParcel2 = async callback => {
  const client = await pool.connect();
  try {
    const params = database.parcel2;
    const sql =
      'INSERT INTO parcels (pick_up_location, destination, placed_by, weight, weight_metric, sent_on, status ) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const results = await client.query(sql, params);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  callback();
};
const addDataToParcel3 = async callback => {
  const client = await pool.connect();
  try {
    const params = database.parcel3;
    const sql =
      'INSERT INTO parcels (pick_up_location, destination, placed_by, weight, weight_metric, sent_on, status ) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const results = await client.query(sql, params);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  callback();
};

createParcelTable(() => {
  addDataToParcel1(() => {
    addDataToParcel2(() => {
      addDataToParcel3(() => {});
    });
  });
});
