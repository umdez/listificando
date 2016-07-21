'use strict';

var CarrosselSlide = {
   nome: 'CarrosselSlide'                                        // É o nome dado a tabela (modelo) no banco de dados.
,  estagiosFinais: ['/CarrosselSlides', '/CarrosselSlides/:id']  // Rotas para o serviço REST.
,  acoes: ['ler', 'deletar']
,  sePossuiAssociacoes: false                                    // Se possui associações.
,  parametroDeBusca: 'busc'                                      // O parametro utilizado na pesquisa.
,  parametroDeSorteio: 'sort'                                    // Parametro de ordenamento.
,  seRealizarPaginacao: false                                    // Caso seja necessário possuir suporte à paginação.
,  controladores: null                                           // Os controladores desta rota.
,  seRecarregarInstancias: false                                 // É importante *não* ligar esta opção, porque causa um comportamento estranho ao atualizar e ou criar registros.
,  excluirAtributos: ['titulo', 'imagem_dir']
,  metodoDeAtualizacao: 'POST'
};

CarrosselSlide.controlador = {};

CarrosselSlide.controlador.ler = {
  'iniciar': {
    
  }
}

/* @Método controladores().
 *
 * Os controladores desta fonte.
 *
 * @Retorna {Objeto} Contendo os controladores do Restificando.
 */
CarrosselSlide.controladores = function() {
  return {
    
    'ler': {  // Controlador
      'iniciar': {  // Percurso
        antesQue: function(req, res, contexto) { // Gancho
          console.log('[Iniciar] antesQue -----> Continuar');
          return contexto.continuar;
        },
        acao: function(req, res, contexto) { // Gancho
          console.log('[Iniciar] acao -----> Pular');
          return contexto.pular;
        },
        depoisDe: function(req, res, contexto) { // Gancho
          console.log('[Iniciar] depoisDe -----> Continuar');
          return contexto.continuar;
        }
      },
      'autenticar': {  // Percurso
        antesQue: function(req, res, contexto) { // Gancho
          console.log('[autenticar] antesQue -----> Continuar');
          return contexto.continuar;
        },
        acao: function(req, res, contexto) { // Gancho
          console.log('[autenticar] acao -----> Continuar');
          return contexto.continuar;
        },
        depoisDe: function(req, res, contexto) { // Gancho
          console.log('[autenticar] depoisDe -----> Continuar');
          return contexto.continuar;
        }
      },
      'trazer': {  // Percurso
        antesQue: function(req, res, contexto) { // Gancho
          console.log('[trazer] antesQue -----> Continuar');
          return contexto.continuar;
        },
        acao: function(req, res, contexto) { // Gancho
          console.log('[trazer] acao -----> Continuar');
          return contexto.continuar;
        },
        depoisDe: function(req, res, contexto) { // Gancho
          console.log('[trazer] depoisDe -----> Continuar');
          return contexto.continuar;
        }
      },
      'dados': {  // Percurso
        antesQue: function(req, res, contexto) { // Gancho
          console.log('[dados] antesQue -----> Continuar');
          return contexto.continuar;
        },
        acao: function(req, res, contexto) { // Gancho
          console.log('[dados] acao -----> Continuar');
          return contexto.continuar;
        },
        depoisDe: function(req, res, contexto) { // Gancho
          console.log('[dados] depoisDe -----> Continuar');
          return contexto.continuar;
        }
      },
      'escrever': {  // Percurso
        antesQue: function(req, res, contexto) { // Gancho
          console.log('[escrever] antesQue -----> Continuar');
          return contexto.continuar;
        },
        acao: function(req, res, contexto) { // Gancho
          console.log('[escrever] acao -----> Continuar');
          return contexto.continuar;
        },
        depoisDe: function(req, res, contexto) { // Gancho
          console.log('[escrever] depoisDe -----> Continuar');
          return contexto.continuar;
        }
      },
      'enviar': {  // Percurso
        antesQue: function(req, res, contexto) { // Gancho
          console.log('[enviar] antesQue -----> Continuar');
          return contexto.continuar;
        },
        acao: function(req, res, contexto) { // Gancho
          console.log('[enviar] acao -----> Continuar');
          return contexto.continuar;
        },
        depoisDe: function(req, res, contexto) { // Gancho
          console.log('[enviar] depoisDe -----> Continuar');
          return contexto.continuar;
        }
      },
      'completar': {  // Percurso
        antesQue: function(req, res, contexto) { // Gancho
          console.log('[completar] antesQue -----> Continuar');
          return contexto.continuar;
        },
        acao: function(req, res, contexto) { // Gancho
          console.log('[completar] acao -----> Continuar');
          return contexto.continuar;
        },
        depoisDe: function(req, res, contexto) { // Gancho
          console.log('[completar] depoisDe -----> Continuar');
          return contexto.continuar;
        }
      }
    }
    
  }
}

module.exports = CarrosselSlide;