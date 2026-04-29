const { Pool } = require('pg');

// O Render injeta a DATABASE_URL automaticamente através das variáveis de ambiente que configuramos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para conexões seguras no Render
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};