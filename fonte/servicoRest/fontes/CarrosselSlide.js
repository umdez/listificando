'use strict';

var CarrosselSlide = {
   nome: 'CarrosselSlide'                                        // É o nome dado a tabela (modelo) no banco de dados.
,  estagiosFinais: ['/carrosselSlides', '/carrosselSlides/:id']  // Rotas para o serviço REST.
,  acoes: ['ler', 'deletar']
,  sePossuiAssociacoes: false                                    // Se possui associações.
,  parametroDeBusca: 'b'                                         // O parametro utilizado na pesquisa.
,  parametroDeSorteio: 's'                                       // Parametro de ordenamento.
,  seRealizarPaginacao: false                                    // Caso seja necessário possuir suporte à paginação.
,  controladores: null                                           // Os controladores desta rota.
,  seRecarregarInstancias: false                                 // É importante *não* ligar esta opção, porque causa um comportamento estranho ao atualizar e ou criar registros.
};

module.exports = CarrosselSlide;