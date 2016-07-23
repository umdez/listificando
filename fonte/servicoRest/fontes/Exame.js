'use strict';

var Exame = {
   nome: 'Exame'                 // É o nome dado a tabela (modelo) no banco de dados.
,  sePossuiAssociacoes: true     // Se possui associações.
,  seRealizarPaginacao: false    // Caso seja necessário possuir suporte à paginação.
,  controladores: null           // Os controladores desta fonte.
,  seRecarregarInstancias: true  
,  metodoDeAtualizacao: 'put'    // Qual será o método para atualização? put, post ou patch?  
};

Exame.estagiosFinais = [ // Os estágios para o serviço REST.
  '/Exames'              
, '/Exames/:id'          // Um registro em especifico.
];  

Exame.busca = {
  parametro: 'busc'  // O parametro a ser utilizado na busca.
, operador: '$like'  // O operador a ser utilizado na busca.
, atributos: []      // Os atributos a serem incluidos nas buscas.
};

Exame.sorteio = {
  parametro: 'sort'  // O parametro de sorteio a ser utilizado.
};

Exame.ordenamento = {
  parametro: 'ord'  // O parametro de ordenamento a ser utilizado.
};

Exame.acoes = [ // As ações permitidas nesta fonte.
  'ler'         // Oferece a capacidade de ler um determinado registro desta fonte.
, 'deletar'     // Oferece a capacidade de deletar um determinado registro desta fonte. 
, 'criar'       // Oferece a capacidade de criar um registro nesta fonte.
, 'atualizar'   // Oferece a capacidade de atualizar um determinado registro desta fonte.
];                                           

Exame.excluirAtributos = [ // Os atributos que serão excluidos.
  
];        

module.exports = Exame;