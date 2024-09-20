const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checarAcesso = require('../middleware/checarAcesso');

// Rotas de login e registro
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/cadastrar', userController.getCadastrar);
router.post('/cadastrar', userController.postCadastrar);

// Dashboard e logout
router.get('/dashboard', checarAcesso.isAdmin, userController.getDashboard);
router.get('/perfil', checarAcesso.isAuthenticated, (req, res) => {
    res.render('perfil', { userName: req.session.userName });
  });
router.get('/logout', userController.logout);

// Editar e excluir usuário
router.get('/edit/:id', checarAcesso.isAdmin, userController.getEditUser);
router.post('/edit/:id', checarAcesso.isAdmin, userController.postEditUser);
router.post('/delete/:id', checarAcesso.isAdmin, userController.deleteUser);



router.get('/perfil', checarAcesso.isAuthenticated, userController.getfilme);

module.exports = router;
