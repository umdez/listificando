'use strict';

/* A nossa configuração para a fonte Usuario.
 * @Veja https://github.com/umdez/restificando/blob/master/docs/aConfiguracao.md
 */
var Usuario = {
   nome: 'Usuario'                    // É o nome dado a tabela (modelo) no banco de dados.
,  sePossuiAssociacoes: true        // Se possui associações.
,  seForRealizarPaginacao: true     // Caso seja necessário possuir suporte à paginação.
,  controladores: null              // Os controladores desta fonte.
,  seForRecarregarInstancias: true  // Recarrega as instancias
,  metodoDeAtualizacao: 'put'       // Qual será o método para atualização? put, post ou patch?  
};

Usuario.estagiosFinais = [ // Os estágios para o serviço REST.
  '/Usuarios'              
, '/Usuarios/:id'          // Um registro em especifico.
];  

Usuario.busca = {
  parametro: 'b'  // O parametro a ser utilizado na busca.
, operador: '$like'  // O operador a ser utilizado na busca.
, atributos: []      // Os atributos a serem incluidos nas buscas.
};

Usuario.sorteio = {
  parametro: 's'  // O parametro de sorteio a ser utilizado.
, atributos: undefined
//, padrao: 'sort'
};

//Exame.sorteio = { padrao: '' };

Usuario.ordenamento = {
  parametro: 'o'  // O parametro de ordenamento a ser utilizado.
};

Usuario.acoes = [ // As ações permitidas nesta fonte.
  'ler'           // Oferece a capacidade de ler um determinado registro desta fonte.
, 'deletar'       // Oferece a capacidade de deletar um determinado registro desta fonte. 
, 'criar'         // Oferece a capacidade de criar um registro nesta fonte.
, 'atualizar'     // Oferece a capacidade de atualizar um determinado registro desta fonte.
, 'listar'
];                                           

Usuario.excluirAtributos = [ // Os atributos que serão excluidos.
  
];        

module.exports = Usuario;