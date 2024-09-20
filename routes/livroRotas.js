const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');
const checarAcesso = require('../middleware/checarAcesso');
const upload = require('../middleware/upload');

// Rota para exibir o formulário de cadastro de filmes (apenas admin)
router.get('/add-filme', checarAcesso.isAdmin, filmeController.getAddfilme);

// Rota para cadastrar um filme com upload de imagem (apenas admin)
router.post('/add-filme', checarAcesso.isAdmin, upload.single('imagem'), filmeController.postAddfilme);

// Rota para visualizar todos os filmes (acessível para todos)
router.get('/filmes', checarAcesso.isAuthenticated, filmeController.getfilmes);

router.post('/filmes', checarAcesso.isAuthenticated, filmeController.getFiltro);

module.exports = router;
