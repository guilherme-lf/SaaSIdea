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
    const { tipo, data } = req.query;
  
    let query = `
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
    `;
  
    const filtros = [];
    const valores = [];
  
    if (tipo && ['entrada', 'saida'].includes(tipo)) {
      filtros.push(`m.tipo = $${valores.length + 1}`);
      valores.push(tipo);
    }
  
    if (data) {
      let dateCondition = '';
      if (data === 'hoje') {
        dateCondition = `m.data::date = CURRENT_DATE`;
      } else if (data === 'semana') {
        dateCondition = `m.data >= CURRENT_DATE - INTERVAL '7 days'`;
      } else if (data === 'mes') {
        dateCondition = `date_trunc('month', m.data) = date_trunc('month', CURRENT_DATE)`;
      }
  
      if (dateCondition) {
        filtros.push(dateCondition);
      }
    }
  
    if (filtros.length > 0) {
      query += ' WHERE ' + filtros.join(' AND ');
    }
  
    query += ' ORDER BY m.data DESC';
  
    try {
      const resultado = await pool.query(query, valores);
      res.status(200).json(resultado.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar movimentações' });
    }
  }
  
  
  
  module.exports = { registrarMovimentacao, listarMovimentacoes };
  