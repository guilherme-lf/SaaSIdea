async function cadastrarProduto(req, res) {
  const pool = req.pool;
  const {
    nome, categoria, marca,
    preco_venda, preco_custo,
    quantidade, validade, codigo_barras
  } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO produtos (
        nome, categoria, marca,
        preco_venda, preco_custo,
        quantidade, validade, codigo_barras
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id
    `, [
      nome, categoria, marca,
      preco_venda, preco_custo,
      quantidade, validade || null,
      codigo_barras
    ]);

    const novoProdutoId = result.rows[0].id;

    res.status(201).send({
      message: 'Produto cadastrado com sucesso.',
      id: novoProdutoId
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao cadastrar produto.' });
  }

}

  // Lista todos os produtos
async function listarProdutos(req, res) {
  const pool = req.pool;
  try {
    const result = await pool.query('SELECT * FROM produtos ORDER BY id DESC');
     res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao listar produtos.' });
  }
}

  // Exclui um produto por ID
async function excluirProduto(req, res) {
  const pool = req.pool;
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
    res.status(200).send({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao excluir produto.' });
  }
}

module.exports = { cadastrarProduto, listarProdutos, excluirProduto };
