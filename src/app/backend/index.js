const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão PostgreSQL
const pool = new Pool({
  user: 'guilherme',
  host: 'localhost',
  database: 'SaaS',
  password: 'pamonha123',
  port: 5432,
});

// Rota GET (já existente)
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

// ✅ Nova rota POST para cadastro
app.post('/usuarios', async (req, res) => {
  const { nome, cpf, telefone, email, rua, numero, cidade, estado, cep, senha } = req.body;

  try {
    await pool.query(
      'INSERT INTO usuarios (nome, cpf, telefone, email, rua, numero, cidade, estado, cep, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [nome, cpf, telefone, email, rua, numero, cidade, estado, cep, senha]
    );
    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
