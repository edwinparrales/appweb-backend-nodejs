const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'aws-0-us-west-2.pooler.supabase.com',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres.oceamwnravhpwmktfszx',
  password: process.env.DB_PASSWORD || 'p4rr4les3204',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error en PostgreSQL:', err);
});

module.exports = pool;
