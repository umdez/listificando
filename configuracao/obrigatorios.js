'use strict';

/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id obrigatorios.js, criado em 02/08/2016 às 10:35 por Leo Felippe $
 *
 * Versão atual 0.0.2-Beta
 */

/* Realiza uma verificação das diretivas obrigatórias. */
 
var propriedade = function(opcoes) {
  this.tipo = opcoes.tipo;
  this.min = opcoes.min;
  this.max = opcoes.max;
};

var asDiretivasObrigatorias = {

  //asDiretivasObrigatorias["armazenamento"]["dialeto"].tipo === 'texto'
  
  "armazenamento.dialeto":  new propriedade({tipo: 'texto', min: 3, max: 12})
, "armazenamento.usuario":  new propriedade({tipo: 'texto', min: 3, max: 12})
, "armazenamento.senha":    new propriedade({tipo: 'texto', min: 3, max: 12})
, "armazenamento.database": new propriedade({tipo: 'texto', min: 3, max: 12})
  
, "servidor.porta":   new propriedade({tipo: 'numero', min: 300, max: 400 })
  
, "servidor.cors.origem":  new propriedade({tipo: 'matriz' })
  
, "servidorRest.base":    new propriedade({tipo: 'texto', min: 5, max: 45})    
};

var obrigatorios = {};

obrigatorios.iniciar = function() {
  
  
};

obrigatorios.adicionarAsVariaveisDoAmbiente = function (configuracao) {

};

module.exports = obrigatorios;