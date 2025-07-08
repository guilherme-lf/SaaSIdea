const express = require('express');
const router = express.Router();
const {
  cadastrarAtendente,
  listarAtendentes,
  excluirAtendente,
  editarAtendente
} = require('../controllers/atendenteController');

router.post('/', cadastrarAtendente);
router.get('/', listarAtendentes);
router.delete('/:id', excluirAtendente);
router.put('/:id', editarAtendente);

module.exports = router;
