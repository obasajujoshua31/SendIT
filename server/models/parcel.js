import { Client } from 'pg';

class Parcel {
  static findAll(callback) {
    const client = new Client();
    client.connect();
    const sql = 'SELECT * FROM parcels';
    return client
      .query(sql)
      .then(results => {
        callback(results.rows);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(parcelId, callback) {
    const client = new Client();
    client.connect();
    const sql = 'SELECT * FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    return client
      .query(sql, params)
      .then(results => {
        callback(results.rows);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByUserId(userId, callback) {
    const client = new Client();
    client.connect();
    const sql = 'SELECT * FROM parcels WHERE placed_by = $1';
    const params = [userId];
    return client
      .query(sql, params)
      .then(results => {
        callback(results.rows);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static save(parcel, callback) {
    const { from, to, placedBy, weight, weightMetric, status } = parcel;
    const sentOn = new Date();
    const client = new Client();
    client.connect();
    const sql =
      'INSERT INTO parcels (pick_up_location, destination, placed_by, weight, weight_metric, sent_on, status ) VALUES ($1, $2, $3,$4, $5, $6, $7)';
    const params = [from, to, placedBy, weight, weightMetric, sentOn, status];
    return client
      .query(sql, params)
      .then(() => {
        this.findAll(results => {
          callback(results);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByIdAndCancel(parcelId, callback) {
    const client = new Client();
    client.connect();
    const sql = 'UPDATE parcels SET status = $1 WHERE parcel_id = $2';
    const params = ['CANCELLED', parcelId];
    return client
      .query(sql, params)
      .then(() => {
        this.findById(parcelId, results => {
          callback(results);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByIdAndChangeLocation(parcelId, location, callback) {
    const client = new Client();
    client.connect();
    const sql = 'UPDATE parcels SET present_location = $1 WHERE parcel_id = $2';
    const params = [location, parcelId];
    return client
      .query(sql, params)
      .then(() => {
        this.findById(parcelId, results => {
          callback(results);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByIdAndUpdate(parcelId, newDestination, callback) {
    const client = new Client();
    client.connect();
    const sql = 'UPDATE parcels SET destination = $1 WHERE parcel_id = $2';
    const params = [newDestination, parcelId];
    return client
      .query(sql, params)
      .then(() => {
        this.findById(parcelId, results => {
          callback(results);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static remove() {
    const client = new Client();
    client.connect();
    const sql = 'DELETE FROM parcels WHERE placed_by = $1';
    const params = [23];
    return client
      .query(sql, params)
      .then(() => {})
      .catch(err => console.log(err));
  }
}

export default Parcel;
