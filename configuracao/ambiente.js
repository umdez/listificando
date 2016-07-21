'use strict';

/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id ambiente.js, criado em 21/07/2016 às 12:45 por Leo Felippe $
 *
 * Versão atual 0.0.1-Beta
 */
 
var ambiente = {};

ambiente.iniciar = function(configuracao) {
  
  this.iniciarVariaveisDoAmbiente(configuracao);
};

ambiente.iniciarVariaveisDoAmbiente = function (configuracao) {
  
  /* Nossos parametros do ambiente. 
   *
   * Para mais informações veja o site https://github.com/dodo/node-jsconfig#configset
   */ 
  
  // Parametros do ambiente
  configuracao.set('env', {
  
  });

};

module.exports = ambiente;