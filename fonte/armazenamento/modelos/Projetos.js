/* @arquivo Projetos.js */

module.exports = function (database, DataTypes) {
  
  var VERSAO_BANCO_DADOS = 1;
    
  // Aqui temos o nosso modelo de projetos. 
  var Projetos = database.define('Projetos', {
    
    // Cada projeto deve possuir um identificador único.
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    
    // Cada projeto deve ter uma descrição que informará o que se deve fazer.
    descricao: { type: DataTypes.STRING, validate: {} }
  }, {
    
    associar: function (modelos) {
      // Cada projeto possui uma equipe responsável, por isso, adicionamos uma 
      // chave estrangeira (projeto_id) no modelo de equipe.
      modelos.Projetos.hasOne(modelos.Equipes, { foreignKey: 'projeto_id' }); 
    },
    underscored: true, // Lembre-se de que utilizamos o padrão snake_case
    timestamps: false
  });

  return {
    mod: Projetos
  , versao: VERSAO_BANCO_DADOS
  }
};