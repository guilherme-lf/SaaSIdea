const express = require('express');
const router = express.Router();
const { cadastrarProduto } = require('../controllers/produtosController');

router.post('/', cadastrarProduto);

// você pode adicionar mais rotas aqui depois (GET, PUT, DELETE)

module.exports = router;
