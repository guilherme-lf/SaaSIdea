const express = require('express');
const router = express.Router();
const {
  cadastrarProduto,
  listarProdutos,
  excluirProduto,
  buscarProdutoPorCodigoBarras: controller
} = require('../controllers/produtosController');

// Listar todos os produtos
router.get('/', listarProdutos);

// Cadastrar novo produto
router.post('/', cadastrarProduto);

// Excluir produto
router.delete('/:id', excluirProduto);

// Buscar produto por código de barras
router.get('/codigo-barras/:codigo', controller.buscarProdutoPorCodigoBarras);

module.exports = router;
