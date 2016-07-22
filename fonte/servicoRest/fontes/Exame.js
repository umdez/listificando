'use strict';

var Exame = {
   nome: 'Exame'                                        // É o nome dado a tabela (modelo) no banco de dados.
,  estagiosFinais: ['/Exames', '/Exames/:id']           // Rotas para o serviço REST.
,  acoes: ['ler', 'deletar', 'criar']
,  sePossuiAssociacoes: true                            // Se possui associações.
,  parametroDeBusca: 'busc'                             // O parametro utilizado na pesquisa.
,  parametroDeSorteio: 'sort'                           // Parametro de ordenamento.
,  seRealizarPaginacao: false                           // Caso seja necessário possuir suporte à paginação.
,  controladores: null                                  // Os controladores desta rota.
,  seRecarregarInstancias: true                         // É importante *não* ligar esta opção, porque causa um comportamento estranho ao atualizar e ou criar registros.
,  excluirAtributos: ['nome']
,  metodoDeAtualizacao: 'put'                           // Qual será o método para atualização? put, post ou patch?  
};

module.exports = Exame;