const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { filme } = require('../models');

// Exibir tela de Login
exports.getLogin = (req, res) => {
    res.render('login');
};

// Processo de login
exports.postLogin = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
  
    if (user && bcrypt.compareSync(senha, user.senha)) {
      req.session.userId = user.id_usuario;
      req.session.userAcesso = user.acesso;
      req.session.userName = user.nome;
  
      // Redireciona dependendo do papel
      if (user.acesso === 'admin') {
        res.redirect('/dashboard');  // Admin pode gerenciar usuários
      } else {
        res.redirect('/perfil');  // Usuário comum vai para seu perfil
      }
  
    } else {
      res.render('login', { error: 'Usuário ou senha incorretos' });
    }
};

exports.getCadastrar = (req, res) => {
    res.render('cadastrar');
};

exports.postCadastrar = async (req, res) => {
    const { nome, email, senha, genero_fav } = req.body;

    try {
        const senhaHash = bcrypt.hashSync(senha, 10);
        await User.create({ nome, email, senha: senhaHash, genero_fav });
        // res.redirect('/login');
        res.redirect('/cadastrar?sucessCad=Usu%C3%A1rio+Cadastrado+com+sucesso!');
    } catch (error) {
        console.error(error);
        res.redirect('/cadastrar?errorCad=Erro+ao+cadastrar+o+Usu%C3%A1rio!');
    } 
};

exports.getDashboard = async (req, res) => {
    if (!req.session.userId) { return res.redirect('/login'); }
    const users = await User.findAll();
    res.render('dashboard', { users });
};

// Tela de edição de usuário
exports.getEditUser = async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const user = await User.findByPk(req.params.id);
    res.render('editUser', { user });
  };
  
// Processo de edição de usuário
exports.postEditUser = async (req, res) => {
    const { nome, email, senha, genero_fav } = req.body;
  
    try {
      const hashedPassword = bcrypt.hashSync(senha, 10);
      await User.update({ nome, email, senha: hashedPassword, genero_fav }, { where: { id_usuario: req.params.id } });
      
      res.redirect(`/edit/${req.params.id}?successAlt=Cadastro+alterado+com+sucesso`);
    
    } catch (err) {
  
      console.error(err);
      res.redirect(`/edit/${req.params.id}?errorAlt=Erro+ao+alterar+usu%C3%A1rio`);
    }
};
  
// Excluir usuário
exports.deleteUser = async (req, res) => {
    try {
      await User.destroy({ where: { id_usuario: req.params.id } });
  
      res.redirect('/dashboard?successDel=Usuário+excluído+com+sucesso');
  
    } catch (err) {
  
      console.error(err);
      res.redirect('/dashboard?errorDel=Erro+ao+excluir+usuário');
    }
};  

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.render('filmes', { user });
  } catch (err) {
    console.error(err);
    res.render('filmes', { user: [], error: 'Erro ao buscar user' });
  }
};


exports.getfilme = async (req, res) => {
  try {
    const filmes = await filme.findAll();
    res.render('perfil', { 
      userName:req.session.userName,
       filmes: filmes });
  } catch (err) {
    console.error(err);
    res.render('perfil', { filmes: [], error: 'Erro ao buscar filmes' });
  }
};
