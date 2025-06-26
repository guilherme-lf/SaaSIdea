async function registrarMovimentacao(req, res) {
    const { produto_id, tipo, quantidade, observacao } = req.body;
    const pool = req.pool;
  
    if (!['entrada', 'saida'].includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo inválido' });
    }
  
    try {
      await pool.query('BEGIN');
  
      const operador = tipo === 'entrada' ? '+' : '-';
      await pool.query(
        `UPDATE produtos SET quantidade_estoque = quantidade_estoque ${operador} $1 WHERE id = $2`,
        [quantidade, produto_id]
      );
  
      await pool.query(
        `INSERT INTO movimentacoes (produto_id, tipo, quantidade, observacao) VALUES ($1, $2, $3, $4)`,
        [produto_id, tipo, quantidade, observacao]
      );
  
      await pool.query('COMMIT');
      res.status(201).json({ mensagem: 'Movimentação registrada com sucesso' });
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error(err);
      res.status(500).json({ erro: 'Erro ao registrar movimentação' });
    }
  }

  async function listarMovimentacoes(req, res) {
    const pool = req.pool;
  
    try {
      const resultado = await pool.query(`
        SELECT 
          m.id,
          m.produto_id,
          p.nome AS produto_nome,
          m.tipo,
          m.quantidade,
          m.observacao,
          m.data
        FROM movimentacoes m
        JOIN produtos p ON m.produto_id = p.id
        ORDER BY m.data DESC
      `);
  
      res.status(200).json(resultado.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar movimentações' });
    }
  }
  
  module.exports = { registrarMovimentacao, listarMovimentacoes };
  