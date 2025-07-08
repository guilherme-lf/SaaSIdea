async function cadastrarAtendente(req, res) {
    const pool = req.pool;
    const { nome, senha } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO atendentes (nome, senha) VALUES ($1, $2) RETURNING id',
        [nome, senha]
      );
  
      res.status(201).send({ message: 'Atendente cadastrado', id: result.rows[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Erro ao cadastrar atendente' });
    }
  }
  
  async function listarAtendentes(req, res) {
    const pool = req.pool;
  
    try {
      const result = await pool.query('SELECT * FROM atendentes ORDER BY id');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Erro ao listar atendentes' });
    }
  }
  
  async function excluirAtendente(req, res) {
    const pool = req.pool;
    const { id } = req.params;
  
    try {
      await pool.query('DELETE FROM atendentes WHERE id = $1', [id]);
      res.status(200).send({ message: 'Atendente excluído com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Erro ao excluir atendente' });
    }
  }
  
  async function editarAtendente(req, res) {
    const pool = req.pool;
    const { id } = req.params;
    const { nome, senha } = req.body;
  
    try {
      await pool.query(
        'UPDATE atendentes SET nome = $1, senha = $2 WHERE id = $3',
        [nome, senha, id]
      );
      res.status(200).send({ message: 'Atendente atualizado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Erro ao editar atendente' });
    }
  }
  
  module.exports = {
    cadastrarAtendente,
    listarAtendentes,
    excluirAtendente,
    editarAtendente
  };
  