async function listarVendas(req, res) {
  const pool = req.pool;

  try {
    const result = await pool.query(`
      SELECT 
        v.id AS venda_id,
        v.data,
        v.total,
        a.nome AS atendente,
        vp.produto_id,
        vp.quantidade,
        vp.preco_unitario
      FROM vendas v
      JOIN atendentes a ON v.atendente_id = a.id
      JOIN vendas_produtos vp ON vp.venda_id = v.id
      ORDER BY v.data DESC
    `);

    // Agrupar os produtos por venda
    const vendasMap = new Map();

    for (const row of result.rows) {
      const id = row.venda_id;

      if (!vendasMap.has(id)) {
        vendasMap.set(id, {
          id,
          data: row.data,
          total: row.total,
          atendente: row.atendente,
          produtos: []
        });
      }

      vendasMap.get(id).produtos.push({
        produto_id: row.produto_id,
        quantidade: row.quantidade,
        preco_unitario: row.preco_unitario
      });
    }

    const vendas = Array.from(vendasMap.values());
    res.status(200).json(vendas);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar vendas' });
  }
}

module.exports = {
  listarVendas
};
