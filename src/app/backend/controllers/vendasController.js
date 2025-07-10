async function listarVendas(req, res) {
    const pool = req.pool;
  
    try {
      const result = await pool.query(`
        SELECT 
          v.id, v.data, v.total,
          a.nome AS atendente,
          vp.produto_id, vp.quantidade, vp.preco_unitario
        FROM vendas v
        JOIN atendentes a ON v.atendente_id = a.id
        JOIN vendas_produtos vp ON vp.venda_id = v.id
        ORDER BY v.data DESC
      `);
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Erro ao listar vendas' });
    }
}
  