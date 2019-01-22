import getResponseFromDB from './getResponseFromDB';

class Parcel {
  /**
   * @param  {null}
   * @return  {Array} parcels
   */
  static async findAll() {
    const sql = 'SELECT * FROM parcels ORDER BY parcel_id DESC ';
    try {
      return await getResponseFromDB(sql, null);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Number} parcelId
   * @return  {Array} findById
   */
  static async findById(parcelId) {
    const sql = 'SELECT * FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Number} userId
   * @return  {Array}
   */
  static async findByUserId(userId) {
    const sql = 'SELECT * FROM parcels WHERE placed_by = $1';
    const params = [userId];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Object} parcel
   * @return  {Array} save
   */
  static async save(parcel) {
    const {
      from,
      to,
      placedBy,
      weight,
      weightMetric,
      status,
      parcelName,
    } = parcel;
    const sentOn = new Date();
    const sql =
      'INSERT INTO parcels (pick_up_location, destination, placed_by, weight, weight_metric, sent_on, status, parcel_name ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const params = [
      from,
      to,
      placedBy,
      weight,
      weightMetric,
      sentOn,
      status,
      parcelName,
    ];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Number} parcelId
   * @return  {Array} findByIdAndCancel
   */
  static async findByIdAndCancel(parcelId) {
    const sql =
      'UPDATE parcels SET status = $1 WHERE parcel_id = $2 RETURNING *';
    const params = ['CANCELLED', parcelId];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Number} parcelId
   * @param  {String} location
   * @return  {Array}  findByIdAndChangeLocation
   */
  static async findByIdAndChangeLocation(parcelId, location) {
    const sql =
      'UPDATE parcels SET present_location = $1 WHERE parcel_id = $2 RETURNING *';
    const params = [location, parcelId];
    console.log(params);
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Number} parcelId
   * @param  {String} destination
   * @return  {Array} findByIdAndUpdate
   */
  static async findByIdAndUpdate(parcelId, destination) {
    const sql =
      'UPDATE parcels SET destination = $1 WHERE parcel_id = $2 RETURNING *';
    const params = [destination, parcelId];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {Number} parcelId
   * @param {String} newStatus
   * @return  {Array} findByIdAndUpdateStatus
   */

  static async findByIdAndUpdateStatus(parcelId, newStatus) {
    let sql;
    let params;
    if (newStatus === 'TRANSITING') {
      sql = 'UPDATE parcels SET status = $1 WHERE parcel_id =$2 RETURNING *';
      params = [newStatus, parcelId];
    } else {
      const deliveredOn = new Date();
      sql =
        'UPDATE parcels SET status = $1, delivered_on = $2 WHERE parcel_id = $3 RETURNING *';
      params = [newStatus, deliveredOn, parcelId];
    }
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {null}
   * @return  {Array} remove
   */
  static async remove() {
    const sql = 'DELETE FROM parcels WHERE pick_up_location = $1 RETURNING *';
    const params = ['University of Lagos'];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
  /**
   * @param  {null}
   * @return  {Array} changeToPlaced
   */

  static async changeToPlaced() {
    const sql =
      'UPDATE parcels SET status = $1 WHERE parcel_id = $2 RETURNING *';
    const params = ['PLACED', 1];
    try {
      return await getResponseFromDB(sql, params);
    } catch (e) {
      throw e;
    }
  }
}

export default Parcel;
