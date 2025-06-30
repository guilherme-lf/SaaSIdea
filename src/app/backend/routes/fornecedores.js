const express = require('express');
const router = express.Router();
const fornecedorCtrl = require('../controllers/fornecedoresController');

router.post('/', fornecedorCtrl.cadastrarFornecedor);
router.get('/', fornecedorCtrl.listarFornecedores);

module.exports = router;
