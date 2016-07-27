/* @arquivo Equipe.js */

module.exports = function (database, DataTypes) {
  
  var VERSAO_BANCO_DADOS = 1;
  
  // Aqui temos o nosso modelo de equipes.
  var Equipe = database.define('Equipe', {
    
    // Cada equipe terá um identificador único.
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    
    // Cada equipe possui um nome.
    nome: { type: DataTypes.STRING, validate: {} },
    
    // Cada equipe deve possuir uma função para um afazer.
    funcao: { type: DataTypes.STRING, validate: {} }
  }, {
    
    associar: function (modelos) {
      // Cada uma das equipes possuirá um time de colaboradores responsáveis, 
      // por isso, nós adicionaremos uma chave estrangeira (equipe_id) no modelo colaborador.
      modelos.Equipe.hasMany(modelos.Colaborador, { foreignKey: 'equipe_id' }); 
    },
    underscored: true, // Lembre-se de que utilizamos o padrão snake_case
    timestamps: false
  });

  return {
    mod: Equipe
  , versao: VERSAO_BANCO_DADOS
  }
};