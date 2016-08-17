'use strict';

/* A nossa configuração para a fonte Projetos.
 * @Veja https://github.com/umdez/restificando/blob/master/docs/aConfiguracao.md
 */
var Projetos = {
   nome: 'Projetos'                 // É o nome dado a tabela (modelo) no banco de dados.
,  sePossuiAssociacoes: true        // Se possui associações.
,  seForRealizarPaginacao: true     // Caso seja necessário possuir suporte à paginação.
,  controladores: null              // Os controladores desta fonte.
,  controladoresFuncionais: null
,  seForRecarregarInstancias: true  // Recarrega as instancias
,  metodoDeAtualizacao: 'put'       // Qual será o método para atualização? put, post ou patch?  
};

Projetos.estagiosFinais = [ // Os estágios para o serviço REST.
  '/Projetos'              
, '/Projetos/:id'          // Um registro em especifico.
];  

Projetos.busca = {
  parametro: 'b'     // O parametro a ser utilizado na busca.
, operador: '$like'  // O operador a ser utilizado na busca.
, atributos: []      // Os atributos a serem incluidos nas buscas.
};

Projetos.sorteio = {
  parametro: 's'  // O parametro de sorteio a ser utilizado.
, padrao: 'id'    // Parametro de sorteio padrão.
};

Projetos.ordenamento = {
  parametro: 'o'  // O parametro de ordenamento a ser utilizado.
};

Projetos.acoes = [ // As ações permitidas nesta fonte.
  'ler'           // Oferece a capacidade de ler um determinado registro desta fonte.
, 'deletar'       // Oferece a capacidade de deletar um determinado registro desta fonte. 
, 'criar'         // Oferece a capacidade de criar um registro nesta fonte.
, 'atualizar'     // Oferece a capacidade de atualizar um determinado registro desta fonte.
, 'listar'        // Oferece a capacidade de listar os registros desta fonte.
];                                           

Projetos.excluirAtributos = [ // Os atributos que serão excluidos.
  
];        

var limitadorDeUso = require('limitador');

/* @Função controladoresFuncionais(). Os controladores funcionais desta fonte. 
 *  
 * @Veja https://github.com/umdez/restificando/blob/master/docs/aUtilizacao.md 
 */
Projetos.controladoresFuncionais = function(fonte) {
  
  if (fonte == undefined) {
    return;
  }

  var limiteDeLeituras = new limitadorDeUso({
    intervalo: 15*60*1000, // 15 minutos.
    max: 2 // Apenas 2 requisições a cada intervalo.
  });

  var limiteDeListagens = new limitadorDeUso({
    intervalo: 60*60*1000, // 60 minutos.
    max: 10 // Apenas 10 requisições a cada intervalo.
  });

  fonte.ler.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return limiteDeLeituras(requisicao, resposta, contexto);
  });
  
  fonte.ler.iniciar.antesQue(function(requisicao, resposta, contexto) {
    // Aqui nós autenticamos.
    return contexto.continuar;
  });

  fonte.ler.iniciar(function(requisicao, resposta, contexto) {
    return contexto.continuar;
  });

  fonte.listar.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return limiteDeListagens(requisicao, resposta, contexto);
  });

  fonte.listar.iniciar(function(requisicao, resposta, contexto) {
    return contexto.continuar;
  });

  fonte.deletar.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return contexto.erro(403, "Não é possível deletar este projeto.");
  });

  fonte.deletar.iniciar(function(requisicao, resposta, contexto) {
    return contexto.pular;
  });
  
};

module.exports = Projetos;