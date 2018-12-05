import getResponseFromDB from './getResponseFromDB';

class Parcel {
  static findAll(callback) {
    const sql = 'SELECT * FROM parcels';
    getResponseFromDB(sql, null, callback);
  }

  static findById(parcelId, callback) {
    const sql = 'SELECT * FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    getResponseFromDB(sql, params, callback);
  }

  static findByUserId(userId, callback) {
    const sql = 'SELECT * FROM parcels WHERE placed_by = $1';
    const params = [userId];
    getResponseFromDB(sql, params, callback);
  }

  static save(parcel, callback) {
    const { from, to, placedBy, weight, weightMetric, status } = parcel;
    const sentOn = new Date();
    const sql =
      'INSERT INTO parcels (pick_up_location, destination, placed_by, weight, weight_metric, sent_on, status ) VALUES ($1, $2, $3,$4, $5, $6, $7) RETURNING *';
    const params = [from, to, placedBy, weight, weightMetric, sentOn, status];
    getResponseFromDB(sql, params, callback);
  }

  static findByIdAndCancel(parcelId, callback) {
    const sql =
      'UPDATE parcels SET status = $1 WHERE parcel_id = $2 RETURNING *';
    const params = ['CANCELLED', parcelId];
    getResponseFromDB(sql, params, callback);
  }

  static findByIdAndChangeLocation(parcelId, location, callback) {
    const sql =
      'UPDATE parcels SET present_location = $1 WHERE parcel_id = $2 RETURNING *';
    const params = [location, parcelId];
    getResponseFromDB(sql, params, callback);
  }

  static findByIdAndUpdate(parcelId, newDestination, callback) {
    const sql =
      'UPDATE parcels SET destination = $1 WHERE parcel_id = $2 RETURNING *';
    const params = [newDestination, parcelId];
    getResponseFromDB(sql, params, callback);
  }

  static findByIdAndUpdateStatus(parcelId, newStatus, callback) {
    let sql;
    let params;
    if (newStatus === 'TRANSITING') {
      sql = 'UPDATE parcels SET status = $1 WHERE parcel_id =$2 RETURNING *';
      params = [newStatus, parcelId];
    } else {
      const deliveredDate = new Date();
      sql =
        'UPDATE parcels SET status = $1, delivered_on = $2 WHERE parcel_id = $3 RETURNING *';
      params = [newStatus, deliveredDate, parcelId];
    }
    getResponseFromDB(sql, params, callback);
  }

  static remove(callback) {
    const sql = 'DELETE FROM parcels WHERE pick_up_location = $1 RETURNING *';
    const params = ['University of Lagos'];
    getResponseFromDB(sql, params, callback);
  }

  static changeToPlaced(callback) {
    const sql =
      'UPDATE parcels SET status = $1 WHERE parcel_id = $2 RETURNING *';
    const params = ['PLACED', 1];
    getResponseFromDB(sql, params, callback);
  }
}

export default Parcel;
