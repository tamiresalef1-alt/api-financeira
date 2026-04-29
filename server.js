const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db');

const app = express();
app.use(express.json()); // Isso aqui é fundamental para o Postman funcionar!
app.use(cors());

// Rota de teste
app.get('/', (req, res) => {
    res.send('API Financeira Online! 🚀');
});

// Rota para BUSCAR dados (GET)
app.get('/dados', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Transacoes');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Erro ao buscar dados: ' + err.message);
    }
});

// NOVA ROTA: Rota para CADASTRAR dados (POST)
app.post('/dados', async (req, res) => {
    try {
        const { descricao, valor } = req.body; 
        const pool = await poolPromise;
        
        await pool.request()
            .input('desc', descricao)
            .input('val', valor)
            .query('INSERT INTO Transacoes (descricao, valor) VALUES (@desc, @val)');
            
        res.status(201).json({ mensagem: 'Cadastrado com sucesso! 🎉' });
    } catch (err) {
        res.status(500).send('Erro ao salvar: ' + err.message);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
