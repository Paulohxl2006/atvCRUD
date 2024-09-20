module.exports = (sequelize, DataTypes) => {
    const filme = sequelize.define('filme', {
      id_filme: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      diretor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      data_lanc: {
        type: DataTypes.DATE,
        allowNull: false
      },
      imagem: {
        type: DataTypes.STRING,  // Caminho da imagem no servidor
        allowNull: true
      }
    }, {
      tableName: 'filme'
    });
  
    return filme;
  };
  