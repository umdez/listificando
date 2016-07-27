'use strict';

/* A nossa configuração para a fonte Equipe.
 * @Veja https://github.com/umdez/restificando/blob/master/docs/aConfiguracao.md
 */
var Equipe = {
   nome: 'Equipe'                   // É o nome dado a tabela (modelo) no banco de dados.
,  sePossuiAssociacoes: true        // Se possui associações.
,  seForRealizarPaginacao: true     // Caso seja necessário possuir suporte à paginação.
,  controladores: null              // Os controladores desta fonte.
,  seForRecarregarInstancias: true  // Recarrega as instancias
,  metodoDeAtualizacao: 'put'       // Qual será o método para atualização? put, post ou patch?  
};

Equipe.estagiosFinais = [ // Os estágios para o serviço REST.
  '/Equipes'              
, '/Equipes/:id'          // Um registro em especifico.
];  

Equipe.busca = {
  parametro: 'b'     // O parametro a ser utilizado na busca.
, operador: '$like'  // O operador a ser utilizado na busca.
, atributos: []      // Os atributos a serem incluidos nas buscas.
};

Equipe.sorteio = {
  parametro: 's'  // O parametro de sorteio a ser utilizado.
, padrao: 'id'    // Parametro de sorteio padrão.
};

Equipe.ordenamento = {
  parametro: 'o'  // O parametro de ordenamento a ser utilizado.
};

Equipe.acoes = [  // As ações permitidas nesta fonte.
  'ler'           // Oferece a capacidade de ler um determinado registro desta fonte.
, 'deletar'       // Oferece a capacidade de deletar um determinado registro desta fonte. 
, 'criar'         // Oferece a capacidade de criar um registro nesta fonte.
, 'atualizar'     // Oferece a capacidade de atualizar um determinado registro desta fonte.
, 'listar'        // Oferece a capacidade de listar os registros desta fonte.
];                                           

Equipe.excluirAtributos = [ // Os atributos que serão excluidos.
  
];        

/* @Função controladores(). Os controladores desta fonte. 
 *  
 * @Veja https://github.com/umdez/restificando/blob/master/docs/aUtilizacao.md
 *
 * @Retorna {Objeto} Os controladores desta fonte para o Restificando. 
 */
Equipe.controladores = function() {
  return {
    'ler': {
      'autenticar': {
        antesQue: function(req, res, contexto) {
          return contexto.continuar;
        },
        acao: function(req, res, contexto) {
          return contexto.continuar;
        },
        depoisDe: function(req, res, contexto) {
          return contexto.continuar;
        }
      }
    }
  }
};

module.exports = Equipe;