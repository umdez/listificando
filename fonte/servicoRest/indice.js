'use strict';

/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id indice.js, criado em 19/07/2016 às 15:46 por Leo Felippe $
 *
 * Versão atual 0.0.1-Beta
 */

/* Realiza o carregamento do nosso serviço REST.
 */

var utilitario = require('util');
var Promessa = require('bluebird');
var fontes = require('./fontes/indice');
var registrador = require('../nucleo/registrador')('servicorest');
var restificando = require('restificando');

/* @Classe ServicoRest().
 *
 * Abstração da gerencia das rotas do serviço REST. Realiza o carregamento das rotas REST do nosso servidor.
 *
 * @Parametro {Objeto} [aplicativo] O nosso aplicativo Express.
 * @Parametro {Objeto} [armazenamento] Contêm o objeto do nosso banco de dados.
 ----------------------------------------------------------------------------------------------------------------------------------------*/
var ServicoRest = function (aplicativo, armazenamento) {

  /* @Propriedade {Objeto} [armazenamento] Classe de armazenamento para o Sequelize. */ 
  this.armazenamento = armazenamento; 
   
  /* @Propriedade {Objeto} [aplicativo] Armazena aplicativo express. */  
  this.aplicativo = aplicativo;
};

/* @Método carregarFontes().
 *
 * Carregamos cada uma das nossas fontes. Cada fonte possui as informações necessárias
 * para a criação de estágios finais, a adição de associações e muitas outras 
 * caracteristicas para um modelo qualquer.
 */
ServicoRest.prototype.carregarFontes = function () {
  this.minhasFontes = fontes();
};

/* @Método carregarServicoRest().  
 *
 * Realiza o iniciar do serviço REST para cada uma das nossas fontes.
 */
ServicoRest.prototype.carregarServicoRest = function () {
  
  var esteObjeto = this;
  
  this.minhasFontes.forEach(function (fonte) {
    
    // Verificamos inicialmente se existe esse modelo.
    if (esteObjeto.armazenamento.hasOwnProperty(fonte.nome)) {
      
      /* Carregamos aqui a nossa fonte. Os parametros possiveis são listados abaixo: 
       *
       *  - opcoes.acoes                  (Opcional) As ações aceitas por esta fonte. 
       *  - opcoes.seRealizarPaginacao    (Opcional) Caso seja necessário habilitar a paginação para determinada fonte.
       *  - opcoes.seRecarregarInstancias (Opcional)
       *  - opcoes.incluir                (Opcional) Vamos incluir mais alguns modelos?
       *  - opcoes.excluirAtributos       (Opcional) Os atributos não necessários e que devem ser excluidos.
       *  - opcoes.busca.parametro        (Opcional) O parametro utilizado para a busca.
       *  - opcoes.sorteio.parametro      (Opcional) O parametro utilizado para sorteio.
       *  - opcoes.modelo                 (Obrigatório) Um modelo do Sequelize.
       *  - opcoes.estagiosFinais         (Opcional) Os estágio de determinada fonte.
       *  - opcoes.metodoDeAtualizacao    (Opcional mas recomendado) Qual será o método para atualização? PUT, POST ou PATCH?
       *  - opcoes.sePossuiAssociacoes    (Opcional) Caso a fonte possua associações com outras fontes.
       *
       * @Veja https://github.com/umdez/restificando#readme
       */
      esteObjeto[fonte.nome] = restificando.fonte({
         modelo: esteObjeto.armazenamento[fonte.nome]               
      ,  estagiosFinais: fonte.estagiosFinais                                  
      ,  sePossuiAssociacoes: fonte.sePossuiAssociacoes || false  
      ,  busca: { parametro: fonte.parametroPesquisa || 'q' }
      ,  sorteio: { parametro: fonte.parametroOrdenamento || 'order' } 
      ,  seRealizarPaginacao: fonte.seRealizarPaginacao || false                                                                 
      ,  seRecarregarInstancias: fonte.seRecarregarInstancias  || false
      });
      
      // Acrescentamos aqui a nossa fonte os seus controladores.
      if (fonte.controladores){
        //var ponteRest = fonte.controladores(esteObjeto.utilitarios);
        //esteObjeto[fonte.nome].usar(ponteRest);
      }
      
    } else {
      registrador.debug('Não encontramos o modelo (' + fonte.nome + ') do banco de dados.');
    }
  });
   
};

/* @Método iniciar(). 
 *
 * Realiza o inicio do serviço REST Restificando e logo em seguida carrega o serviço REST
 * para cada um dos modelos do banco de dados. 
 *
 * @Retorna {Promessa} Promessa de recusa ou de deliberação. 
 */
ServicoRest.prototype.iniciar = function () {

  registrador.debug('Iniciando serviço REST Restificando.');

  var esteObjeto = this;

  return new Promessa(function (deliberar, recusar) {

    // Inicia o serviço REST Restificando.
    restificando.inicializar({
      aplicativo: esteObjeto.aplicativo,             // Aplicativo Express.
      sequelize: esteObjeto.armazenamento.sequelize  // Nosso ORM Sequelize.
    });
    
    // Carregamos aqui as nossas fontes.
    esteObjeto.carregarFontes();
    
    // Carrega os arquivos que contem os nossos modelos.
    esteObjeto.carregarServicoRest();

    // Se tudo ocorreu bem.
    deliberar(esteObjeto);
    
  });
};

module.exports = ServicoRest;