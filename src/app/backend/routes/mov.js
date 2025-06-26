const express = require('express');
const router = express.Router();
const { registrarMovimentacao } = require('../controllers/movimentacaoController');

router.post('/', registrarMovimentacao);

// GET - listar movimentações
router.get('/api/movimentacoes', listarMovimentacoes);

module.exports = router;
