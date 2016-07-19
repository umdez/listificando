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
var configuracao = require('jsconfig');
var pastaDeConfiguracaoPadrao = pasta.join(__dirname, "/configuracao/configuracao.js");
var http = require('http');
var https = require('https');
var morgan = require('morgan');
var restificando = require('restificando');
var express = require('express');
var sequelize = require('sequelize');
var registrador = require('./fonte/nucleo/registrador')('iniciar');  // Carregamos o nosso registrador

// Parametros do ambiente
configuracao.set('env', {
  DOMAIN: 'domain',
  PORT: ['port', parseInt],
  SSLPORT: ['sslPort', parseInt]
});

/* Nossas opções de entrada para configuração pela linha de comando. 
 * 
 * O comando é: node iniciar -opção valor
 *
 * - c  O endereço e nome do arquivo de configuração a ser carregado. ex. ./pasta/de/configuracao/configuracao.js
 * - p  A porta utilizada pelo servidor http. ex. 80
 */
configuracao.cli({
  configuracao: ['c', "Endereço da pasta e nome do arquivo de configuracao", 'path', pastaDeConfiguracaoPadrao],
  porta: ['server.port', ['p', "Porta do servidor http", 'int']]
});

// Aqui carregamos o arquivo de configuração
configuracao.defaults(pastaDeConfiguracaoPadrao);

/* Carregamos assincronamente a nossa configuração e prosseguimos com a inicialização dos nossos serviços.
 *
 * @Parametro {Objeto} [args] Argumento passados
 * @Parametro {Objeto} [opcs] As opções dos argumentos.
 */
configuracao.load(function(args, opcs) {

  // Armazenamos aqui o endereço e nome do arquivo de configuração por meio dos argumentos informados.
  if(args.length > 0) {
    opcs.configuracao = args[args.length - 1];
  }

  // Faz a união ou substituição da configuração padrão com a configuração informada.
  if(opcs.configuracao !== pastaDeConfiguracaoPadrao) {
    configuracao.merge(require(opcs.configuracao));
  }
  
  // Iniciamos o servidor express
  var aplicativo = express();
  
  // Aqui temos as origens permitidas no nosso serviço CORS. Lembre-se que iremos oferecer dois tipos de conexões (http e https).
  var listaDasOrigensPermitidas = configuracao.servidor.cors.origem;

  /* Iremos separar as preocupações do nosso projeto, para isso nós iremos oferecer os serviços deste servidor para
   * a parte da visão. Assim iremos oferecer aceitação de conexões e requisições dos dominios de origem permitidos 
   * utilizando o módulo CORS. 
   * @Veja https://www.npmjs.com/package/cors
   */
  var cors = require('cors');
  aplicativo.use(cors({
    origin: function(origem, cd) {  // Origem aceita por este servidor express.
      var seOrigemPermitida = listaDasOrigensPermitidas.indexOf(origem) !== -1;
      cd(null, seOrigemPermitida);
    }  
  , methods:  ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS']  // Métodos aceitos.
  , allowedHeaders: ['Content-Range', 'X-total', 'Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version']
  , exposedHeaders: ['Content-Range', 'X-total']  // Aqui teremos os cabeçalhos *expostos* para as requisições ajax. @Veja http://stackoverflow.com/a/15444439/4187180
  , credentials: true
  }));
  
  /* Aqui temos a nossa chave e certificado. Foi utilizado a ferramenta openssl provida pelo git. 
   * O comando para cria-los: openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privatekey.key -out certificate.crt
   * @Veja https://stackoverflow.com/questions/2355568/create-a-openssl-certificate-on-windows
   */
  var chavePrivada  = sistemaDeArquivo.readFileSync('./certificados/' + configuracao.servidor.certificados.chavePrivada, 'utf8');
  var certificado = sistemaDeArquivo.readFileSync('./certificados/' + configuracao.servidor.certificados.certificado, 'utf8');
  var credenciais = {key: chavePrivada, cert: certificado};
  
  // Utilizamos o bodyParser para receber requisições POST ou PUT.
  // Lembre-se de manter o limit do body em 200kb para nos precaver dos ataques de negação de serviço.
  var bodyParser = require('body-parser');
  aplicativo.use(bodyParser.json({limit: configuracao.servidor.limite}));
  aplicativo.use(bodyParser.urlencoded({limit: configuracao.servidor.limite, extended: false}));
  
  // Porta ao qual iremos receber requisições http.  
  aplicativo.set('porta', process.env.PORT || configuracao.servidor.porta);
  
  // Porta ao qual iremos receber requisições https.  
  aplicativo.set('portaSSL', process.env.SSLPORT || configuracao.servidor.portaSSL);
  
  // Adicionamos isso para realizar o registro de requisições.
  aplicativo.use(morgan('combined'));
  
  // Chamamos o arquivo principal, ele vai carregar os outros arquivos principais do servidor.
  var principal = require('./fonte/iniciador/principal');
  
  // {config: configuracao, aplicativo: aplicativo }
  
  principal.prosseguir(configuracao, aplicativo, function() {
    
    registrador.debug('Carregando o servidor HTTP e HTTPS.');
    
    // Inicia o servidor HTTP e começa a esperar por conexões.
    aplicativo.servidor = http.createServer(aplicativo);
    aplicativo.servidor.listen(aplicativo.get('porta'), function () {
      registrador.debug("Servidor HTTP express carregado e escutando na porta " + aplicativo.get('porta'));
    });
    
    // Inicia o servidor HTTPS e começa a esperar por conexões.
    aplicativo.servidorSSL = https.createServer(credenciais, aplicativo);
    aplicativo.servidorSSL.listen(aplicativo.get('portaSSL'), function () {
      registrador.debug("Servidor HTTPS express carregado e escutando na porta " + aplicativo.get('portaSSL'));
    });
    
  });
  
});

/*
// Após iniciar uma fonte, é necessário apenas iniciar o serviço desta forma:
restificando.inicializar({
  aplicativo: express,
  sequelize: sequelize
});


*/