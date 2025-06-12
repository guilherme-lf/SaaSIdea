// Listar todos os usuários
async function listarUsuarios(req, res) {
    const pool = req.pool;
  
    try {
      const result = await pool.query('SELECT * FROM usuarios');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
  }
  
  // Cadastrar novo usuário
  async function cadastrarUsuario(req, res) {
    const pool = req.pool;
    const {
      nome, cpf, telefone, email,
      rua, numero, cidade, estado, cep, senha
    } = req.body;
  
    try {
      await pool.query(
        `INSERT INTO usuarios (
          nome, cpf, telefone, email,
          rua, numero, cidade, estado, cep, senha
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [nome, cpf, telefone, email, rua, numero, cidade, estado, cep, senha]
      );
      res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
    }
  }
  
  module.exports = {
    listarUsuarios,
    cadastrarUsuario
  };

  // Função de login
async function loginUsuario(req, res) {
    const pool = req.pool;
    const { email, senha } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
        [email, senha]
      );
  
      if (result.rows.length > 0) {
        res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
      } else {
        res.status(401).json({ erro: 'Email ou senha inválidos.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao realizar login.' });
    }
  }
  module.exports = {
    listarUsuarios,
    cadastrarUsuario,
    loginUsuario
  };
  