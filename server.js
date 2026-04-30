const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa a conexão do seu arquivo db.js

const app = express();
app.use(express.json()); // Fundamental para o Postman e o Dashboard funcionarem
app.use(cors()); // Libera o acesso para outras pessoas verem seu dashboard

// Rota de teste: Acesse https://onrender.com para ver essa mensagem
app.get('/', (req, res) => {
    res.send('API Financeira Online! 🚀');
});

// Rota para BUSCAR dados (GET)
app.get('/dados', async (req, res) => {
    try {
        // No PostgreSQL, usamos db.query e os resultados vêm em .rows
        const result = await db.query('SELECT * FROM Transacoes');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Erro ao buscar dados: ' + err.message);
    }
});

// Rota para CADASTRAR dados (POST)
app.post('/dados', async (req, res) => {
    try {
        const { descricao, valor } = req.body; 
        
        // No PostgreSQL, usamos $1, $2 para evitar ataques e erros
        await db.query('INSERT INTO Transacoes (descricao, valor) VALUES ($1, $2)', [descricao, valor]);
            
        res.status(201).json({ mensagem: 'Cadastrado com sucesso! 🎉' });
    } catch (err) {
        res.status(500).send('Erro ao salvar: ' + err.message);
    }
});

// O Render define a porta automaticamente, por isso usamos process.env.PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

