'use strict';

/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id iniciar.js, criado em 17/07/2016 às 15:22 por Leo Felippe $
 *
 * Versão atual 0.0.1-Beta
 */
 
var sistemaDeArquivo = require('fs');
var pasta = require('path');
var pastaDeConfiguracaoPadrao = pasta.join(__dirname, '/configuracao/configuracao.js');
var express = require('express');
var configurado = require('configurado');
var registrador = require('./fonte/nucleo/registrador')('iniciar');  // Carregamos o nosso registrador
var Expressando = require('expressando');

configurado.iniciar(pastaDeConfiguracaoPadrao, function(configuracao) {
  
  // Iniciamos o servidor express
  var aplicativo = express();
  
  // Nossa configuração do servidor Express.
  var confDoServidor = configuracao.servidor;
  
  // Aqui temos a nossa chave e certificado para nosso servidor https.
  var chavePrivada  = sistemaDeArquivo.readFileSync('./certificados/' + confDoServidor.certificados.chavePrivada, 'utf8');
  var certificado = sistemaDeArquivo.readFileSync('./certificados/' + confDoServidor.certificados.certificado, 'utf8');
  var credenciais = { key: chavePrivada, cert: certificado };
  
  var listaDeRotas = [
    // Iremos servir os arquivos do diretorio "/testes"
    { "caminho": express.static(pasta.join(__dirname, 'testes')), "rota": '/' }
  
    // Iremos servir os arquivos do diretorio "testes/incluir/js/bibliotecas"
  , { "caminho": express.static(pasta.join(__dirname, 'testes/incluir/js/bibliotecas')), "rota": '/bibliotecas' }
  
    // Iremos servir os arquivos do diretorio "testes/incluir/estilos"
  , { "caminho": express.static(pasta.join(__dirname, 'testes/incluir/estilos')), "rota": '/estilos' }
  ];

  var expressando = new Expressando({
    "configuracao": configuracao,
    "aplicativo": aplicativo,
    "credenciais": credenciais,
    "lista": listaDeRotas
  }, function(objExpressando){ objExpressando.carregar(); });
  
  // Chamamos o arquivo principal, ele vai carregar os outros arquivos
  // principais do servidor.
  var principal = require('./fonte/iniciador/principal');
  
  principal.prosseguir(configuracao, aplicativo, function() {
    registrador.debug('Carregando o servidor HTTP e HTTPS.');
    expressando.escutar(function(){
      // pronto
    });
  });
  
});
