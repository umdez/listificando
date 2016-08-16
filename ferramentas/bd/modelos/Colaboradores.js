/* @arquivo Colaboradores.js */

module.exports = function (database, DataTypes) {
  
  var VERSAO_BANCO_DADOS = 1;
  
  // Aqui temos o nosso modelo de colaboradores.
  var Colaboradores = database.define('Colaboradores', {
    
    // Cada colaborador terá um identificador único.
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    
    // Cada colaborador possui um nome.
    nome: { type: DataTypes.STRING, validate: {} },
    
    // Cada colaborador possui uma função.
    funcao: { type: DataTypes.STRING, validate: {} }
  }, {
    
    associar: function (modelos) {
      // Cada um dos colaboradores pertecerá a uma equipe.
      modelos.Colaboradores.belongsTo(modelos.Equipes, {foreignKey: 'minha_equipe_id'}); 
    },
    underscored: true, // Lembre-se de que utilizamos o padrão snake_case
    timestamps: false
  });

  return {
    mod: Colaboradores
  , versao: VERSAO_BANCO_DADOS
  }
};