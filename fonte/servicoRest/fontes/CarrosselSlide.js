'use strict';

/* A nossa configuração para a fonte CarrosselSlide.
 * @Veja https://github.com/umdez/restificando/blob/master/docs/aConfiguracao.md
 */
var CarrosselSlide = {
   nome: 'CarrosselSlide'           // É o nome dado a tabela (modelo) no banco de dados.
,  sePossuiAssociacoes: false       // Se possui associações.
,  seForRealizarPaginacao: true     // Caso seja necessário possuir suporte à paginação.
,  controladores: null              // Os controladores desta fonte.
,  seForRecarregarInstancias: true  // Recarrega as instancias  
,  metodoDeAtualizacao: 'put'       // Qual será o método para atualização? put, post ou patch?
};

CarrosselSlide.estagiosFinais = [ // Os estágios para o serviço REST.
  '/CarrosselSlides'              
, '/CarrosselSlides/:id'          // Um registro em especifico.
];  

CarrosselSlide.busca = {
  parametro: 'b'      // O parametro a ser utilizado na busca.
, operador: '$like'      // O operador a ser utilizado na busca.
, atributos: []          // Os atributos a serem incluidos nas buscas.
};

CarrosselSlide.sorteio = {
  parametro: 's'      // O parametro de sorteio.
, atributos: undefined
};

CarrosselSlide.ordenamento = {
  parametro: 'o'  // O parametro de ordenamento a ser utilizado.
};

CarrosselSlide.acoes = [ // As ações permitidas nesta fonte.
  'ler'                  // Oferece a capacidade de ler um determinado registro desta fonte.
, 'deletar'              // Oferece a capacidade de deletar um determinado registro desta fonte. 
, 'criar'                // Oferece a capacidade de criar um registro nesta fonte.
, 'atualizar'            // Oferece a capacidade de atualizar um determinado registro desta fonte.
, 'listar' 
];                                           

CarrosselSlide.excluirAtributos = [ // Os atributos que serão excluidos.
  'titulo'
, 'imagem_dir'
];        

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