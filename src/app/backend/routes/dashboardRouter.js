const express = require('express');
const router = express.Router();
const db = require('../db'); // Ajuste conforme seu acesso ao banco

router.get('/', async (req, res) => {
  try {
    const [
      totalProdutos,
      totalVendas,
      totalMovimentacoes,
      totalAtendentes,
      ultimasVendas,
      vendasPorDia
    ] = await Promise.all([
      db.query('SELECT COUNT(*) AS total FROM produtos'),
      db.query('SELECT COUNT(*) AS total FROM vendas'),
      db.query('SELECT COUNT(*) AS total FROM movimentacoes'),
      db.query('SELECT COUNT(*) AS total FROM atendentes'),
      db.query(`
        SELECT v.id, v.data, v.total, a.nome AS atendente
        FROM vendas v
        JOIN atendentes a ON v.atendente_id = a.id
        ORDER BY v.data DESC
        LIMIT 5
      `),
      db.query(`
        SELECT DATE(data) AS data, SUM(total) AS total
        FROM vendas
        WHERE data >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY DATE(data)
        ORDER BY data ASC
      `)
    ]);

    res.json({
      totais: {
        produtos: totalProdutos[0].total,
        vendas: totalVendas[0].total,
        movimentacoes: totalMovimentacoes[0].total,
        atendentes: totalAtendentes[0].total,
      },
      ultimasVendas,
      vendasPorDia
    });
  } catch (error) {
    console.error('Erro no dashboard:', error);
    res.status(500).json({ erro: 'Erro ao carregar dados do dashboard' });
  }
});

module.exports = router;
