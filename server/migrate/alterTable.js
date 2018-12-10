import pool from '../config/config';

(async () => {
  const client = await pool.connect();
  try {
    const sql =
      'ALTER TABLE parcels ADD COLUMN parcel_name VARCHAR(255), ADD COLUMN parcel_cost VARCHAR(255), ADD COLUMN parcel_estimated_distance VARCHAR(255), ADD COLUMN parcel_estimated_duration VARCHAR(255);';
    const results = await client.query(sql);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
})();
