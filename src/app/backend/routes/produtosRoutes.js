const express = require('express');
const router = express.Router();
const {
  cadastrarProduto,
  listarProdutos,
  excluirProduto
} = require('../controllers/produtosController');

// Listar todos os produtos
router.get('/', listarProdutos);

// Cadastrar novo produto
router.post('/', cadastrarProduto);

// Excluir produto
router.delete('/:id', excluirProduto);

module.exports = router;
