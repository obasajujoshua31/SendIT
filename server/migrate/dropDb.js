import pool from '../config/config';

(async () => {
  const client = await pool.connect();
  try {
    const sql = 'DROP TABLE IF EXISTS parcels; DROP TABLE IF EXISTS users';
    const results = await client.query(sql);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
})();
