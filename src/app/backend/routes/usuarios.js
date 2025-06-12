const express = require('express');
const router = express.Router();
const {
  listarUsuarios,
  cadastrarUsuario,
  loginUsuario
} = require('../controllers/usuarioController');

router.get('/', listarUsuarios);
router.post('/', cadastrarUsuario);
router.post('/login', loginUsuario); // 🔒 Rota de login

module.exports = router;
