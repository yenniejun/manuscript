import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(tablename, columns, values) {
    const tablename_id = tablename + 'id'; // ex: authorid
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING ${tablename_id}, ${columns}
      `;
    return this.pool.query(query);
  }

  async updateWithReturn(tablename, id, update_query, columns) {
    const tablename_id = tablename + 'id'; // ex: authorid
    const query = `
          UPDATE ${this.table}
          SET ${update_query}
          WHERE ${tablename_id} = '${id}'
          RETURNING ${tablename_id}, ${columns}
      `;
    return this.pool.query(query);
  }

  async deleteFromTable(tablename, id) {
    const tablename_id = tablename + 'id'; // ex: authorid
    const query = `
          DELETE FROM ${this.table}
          WHERE ${tablename_id} = '${id}'
      `;
    return this.pool.query(query);
  }
}

export default Model;