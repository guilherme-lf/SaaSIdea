const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const usuarioRoutes = require('./routes/usuario');
const produtoRoutes = require('./routes/prod');
const movimentacaoRoutes = require('./routes/mov');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

// Conexão com PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Torna a pool acessível em todas as rotas
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Rotas organizadas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/movimentacoes', movimentacaoRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
