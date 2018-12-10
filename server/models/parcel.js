import getResponseFromDB from './getResponseFromDB';

class Parcel {
  static findAll(callback) {
    const sql = 'SELECT * FROM parcels ORDER BY parcel_id DESC ';
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
    const {
      from,
      to,
      placedBy,
      weight,
      weightMetric,
      status,
      estimatedCost,
      estimatedDistance,
      estimatedDuration,
      parcelName,
    } = parcel;
    const sentOn = new Date().toLocaleString();
    const sql =
      'INSERT INTO parcels (pick_up_location, destination, placed_by, weight, weight_metric, sent_on, status, parcel_cost, parcel_estimated_distance, parcel_estimated_duration, parcel_name ) VALUES ($1, $2, $3,$4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
    const params = [
      from,
      to,
      placedBy,
      weight,
      weightMetric,
      sentOn,
      status,
      estimatedCost,
      estimatedDistance,
      estimatedDuration,
      parcelName,
    ];
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

  static findByIdAndUpdate(parcelId, parcelUpdateDetails, callback) {
    const {
      destination,
      estimatedCost,
      estimatedDistance,
      estimatedDuration,
    } = parcelUpdateDetails;
    const sql =
      'UPDATE parcels SET destination = $1, parcel_cost = $2, parcel_estimated_distance = $3, parcel_estimated_duration = $4 WHERE parcel_id = $5 RETURNING *';
    const params = [
      destination,
      estimatedCost,
      estimatedDistance,
      estimatedDuration,
      parcelId,
    ];
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
