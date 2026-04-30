const { Pool } = require('pg');
require('dotenv').config(); // ADICIONE ESTA LINHA AQUI

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Exporta o pool diretamente para o server.js usar
module.exports = pool;