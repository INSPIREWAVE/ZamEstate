const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const testConnection = async () => {
  console.log('Connecting to database...');
  let client;
  try {
    client = await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    if (err.code === '3D000') {
      const urlParts = process.env.DATABASE_URL.split('/');
      const rawName = urlParts.length > 1 ? urlParts.pop() : '';
      const dbName = (rawName.split('?')[0] || 'zam_estate').replace(/[^a-zA-Z0-9_]/g, '');
      console.error(
        `ERROR: Database '${dbName}' does not exist. Please create it manually using: CREATE DATABASE ${dbName};`
      );
    } else {
      console.error('ERROR: Failed to connect to the database:', err.message);
    }
    throw err;
  } finally {
    if (client) client.release();
  }
};

module.exports = { pool, testConnection };
