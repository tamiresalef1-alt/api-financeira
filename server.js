const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

// Serve o frontend
app.use(express.static(path.join(__dirname)));

// Rota para buscar os dados
app.get('/dados', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM financeira');
        res.json(result.rows);
    } catch (err) {
        console.error("Erro no banco:", err.message);
        res.status(500).json({ error: "Erro ao buscar dados" });
    }
});

// Configuração da Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

