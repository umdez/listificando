'use strict'

/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id principal.js, criado em 26/07/2016 às 17:22 por Leo Felippe $
 *
 * Versão atual 0.0.2-Beta
 */

/* Arquivo de configuração da biblioteca require.js.
 */

/* O require.js nos habilita a realizar uma configuração dos atalhos dos modulos.
 * Também é responsável pelo carregamento ordenado dos módulos utilizando dependencias.
 *
 * @Diretiva {baseUrl} O caminho base onde os scripts serão requisitados.
 * @Diretiva {waitSeconds} Limite em segundos do total de segundos que serão 
 *                         esperados para o carregamento total de determinado script.
 * @Diretiva {paths} O caminho onde determinado módulo se encontra.
 * @Diretiva {shim} Realizamos o carregamento de scripts que não são compativeis com o padrão AMD.
 */
require.config({
  
  // Base de onde os scripts serão requisitados.
  baseUrl: "/testes/js",
  
  // Quantidade de segundos para desistir de carregar um módulo.
  waitSeconds: 7,
  
  // Os caminhos de cada um dos nossos modulos.
  paths: {
    'text': '/bibliotecas/text'                              // Para carregamento de arquivos em texto. por exemplo, arquivos .html
  , 'underscore': '/bibliotecas/underscore'
  , 'backbone': '/bibliotecas/backbone'                      // Backbone
  , 'backbone.paginator': '/bibliotecas/backbone.paginator'  // Adicionar paginação ao BackBone. @veja https://github.com/backbone-paginator/backbone.paginator
  , 'jquery': '/bibliotecas/jquery'
  , 'templantes': '../templantes'                            // Pasta dos nossos templantes
  , 'domReady': '/bibliotecas/domReady'
  },
  
  // Lembre-se: Somente usar o shim para aqueles scripts que não são AMD. 
  // Ele não vai funcionar corretamente se informado um script AMD.
  shim: {
    
    'backbone': {
      deps: ['underscore', 'jquery'], // As dependencias do backbone
      exports: 'Backbone'             // Ao ser carregado, use a variavel global 'Backbone' como valor do modulo.
    },
    'underscore': {
      exports: '_'  
    }
  }

});

require([
  'aplicativo'  // Carrega o modulo do aplicativo e o passa para nossa função de definição
, 'domReady'    // Vamos esperar o DOM estiver apresentado e carregado.
], function(Aplicativo, DomReady) {
  
  DomReady(function () {  // É chamada logo após a página estiver toda carregada e apresentada.

    // Aqui nós iniciamos aqui nosso aplicativo.
    Aplicativo.inicializar();
  });
});