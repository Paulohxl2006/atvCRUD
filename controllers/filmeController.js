const { filme } = require('../models');

exports.getAddfilme = (req, res) => {
    res.render('addfilme');
  };

// Cadastrar um novo filme com imagem (apenas para admin)
exports.postAddfilme = async (req, res) => {
  const { titulo, diretor, genero, descricao, data_lanc } = req.body;
  const imagem = req.file ? req.file.filename : null;  // Pega o nome do arquivo da imagem

  try {
    await filme.create({
      titulo,
      diretor,
      genero,
      descricao,
      data_lanc,
      imagem  // Armazena o nome do arquivo da imagem no banco de dados
    });
    res.redirect('/filmes?success=filme+cadastrado+com+sucesso');
  } catch (err) {
    console.error(err);
    res.redirect('/filmes?error=Erro+ao+cadastrar+filme');
  }
};

// Visualizar todos os filmes (acessível para todos os usuários)
exports.getfilmes = async (req, res) => {
    try {
      const filmes = await filme.findAll();
      res.render('filmes', { filmes });
    } catch (err) {
      console.error(err);
      res.render('filmes', { filmes: [], error: 'Erro ao buscar filmes' });
    }
  };

  exports.getFiltro = async (req, res) => {
    try {
      const pesquisar = req.body.pesquisar ; 
      console.log(pesquisar); 
      let filmes = await filme.findAll(); 
  

      filmes = filmes.filter(filme => 
        filme.titulo.includes(pesquisar)
      );
  
      res.render('filmes', { filmes: filmes });
    } catch (err) {
      console.error(err);
      res.render('filmes', { filmes: [], error: 'Erro ao buscar filmes' });
    }
  };
  
