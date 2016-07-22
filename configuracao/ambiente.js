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
  
  this.adicionarAsVariaveisDoAmbiente(configuracao);
};

ambiente.adicionarAsVariaveisDoAmbiente = function (configuracao) {
  
  /* Define todos as nossas variaveis do ambiente que devem ser incluidas na nossa configuração padrão.
   * Isso faz reescrever os valores do arquivo de configuração (arquivos padrões tambem serão reescritos).
   *
   * Para mais informações veja o site https://github.com/dodo/node-jsconfig#configset
   */
   
  configuracao.set('env', {
  
  });

};

module.exports = ambiente;