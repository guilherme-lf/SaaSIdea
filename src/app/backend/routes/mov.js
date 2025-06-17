const express = require('express');
const router = express.Router();
const { registrarMovimentacao } = require('../controllers/movimentacaoController');

router.post('/', registrarMovimentacao);

module.exports = router;
