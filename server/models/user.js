import { Client } from 'pg';

class User {
  static save(user, callback) {
    const { firstName, lastName, email, password, isAdmin, username } = user;
    const registeredOn = new Date();
    const client = new Client();
    client.connect();
    const sql =
      'INSERT INTO users (first_name, last_name, email, password, is_admin, registered_on, username) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const params = [
      firstName,
      lastName,
      email,
      password,
      isAdmin,
      registeredOn,
      username,
    ];
    return client
      .query(sql, params)
      .then(() => {
        this.findOne(email, results => {
          callback(results);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findOne(email, callback) {
    const client = new Client();
    client.connect();
    const sql = 'SELECT email, password, username FROM users WHERE email = $1';
    const params = [email];
    return client
      .query(sql, params)
      .then(results => {
        callback(results.rows);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default User;
