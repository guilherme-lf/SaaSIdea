const express = require('express');
const router = express.Router();
const { listarVendas } = require('../controllers/vendasController');

// GET /api/vendas
router.get('/', listarVendas);

module.exports = router;
