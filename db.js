const sql = require('mssql');
require('dotenv').config(); // Esta linha é fundamental para ler o .env

const config = {
    user: process.env.DB_USER,      // Vai ler 'sa' do seu .env
    password: process.env.DB_PWD,   // Vai ler '123' do seu .env
    server: process.env.DB_SERVER,  // Vai ler 'localhost' do seu .env
    database: process.env.DB_NAME,  // Vai ler 'FinanceHub' do seu .env
    options: {
        encrypt: false,             // Mantenha false para o SQL local, mudaremos para true na Azure
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado ao SQL Server! ✅');
        return pool;
    })
    .catch(err => console.log('Erro de conexão: ', err));

module.exports = {
    sql, poolPromise
};