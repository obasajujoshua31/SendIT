import pool from '../config/config';

(async () => {
  const client = await pool.connect();
  try {
    const sql =
      'ALTER TABLE parcels DROP COLUMN IF EXISTS parcel_cost, DROP COLUMN IF EXISTS parcel_duration, DROP COLUMN IF EXISTS parcel_estimated_distance, DROP COLUMN IF EXISTS parcel_estimated_duration;';
    const results = await client.query(sql);
    console.log(results.rowCount);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
})();
