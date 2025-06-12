async function cadastrarProduto(req, res) {
    const pool = req.pool;
    const {
      nome, categoria, marca,
      preco_venda, preco_custo,
      quantidade, validade, codigo_barras
    } = req.body;
  
    try {
      await pool.query(`
        INSERT INTO produtos (
          nome, categoria, marca,
          preco_venda, preco_custo,
          quantidade, validade, codigo_barras
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `, [
        nome, categoria, marca,
        preco_venda, preco_custo,
        quantidade, validade || null,
        codigo_barras
      ]);
  
      res.status(201).send({ message: 'Produto cadastrado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro ao cadastrar produto.' });
    }
  }
  
  module.exports = { cadastrarProduto };
  