const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const usuarioRoutes = require('./routes/usuario');
const produtoRoutes = require('./routes/prod');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL
const pool = new Pool({
  user: 'guilherme',
  host: 'localhost',
  database: 'SaaS',
  password: 'pamonha123',
  port: 5432,
});

// Torna a pool acessível em todas as rotas
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Rotas organizadas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/produtos', produtoRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
