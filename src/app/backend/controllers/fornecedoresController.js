const { Pool } = require('pg');

// Configure sua conexão com o banco de dados
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco',
  password: 'sua_senha',
  port: 5432,
});

exports.cadastrarFornecedor = async (req, res) => {
  const { nome, cnpj, email, telefone, endereco } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO fornecedores (nome, cnpj, email, telefone, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, cnpj, email, telefone, endereco]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar fornecedor:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar fornecedor' });
  }
};

exports.listarFornecedores = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fornecedores ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar fornecedores:', error);
    res.status(500).json({ erro: 'Erro ao listar fornecedores' });
  }
};
