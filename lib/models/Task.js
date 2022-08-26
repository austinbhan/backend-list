const pool = require('../utils/pool');

module.exports = class Task {
  id;
  description;

  constructor(row) {
    this.id = row.id;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows.map((row) => new Task(row));
  }
};
