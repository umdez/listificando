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
var pastaDeConfiguracaoPadrao = pasta.join(__dirname, '/configuracao/configuracao.js');
var http = require('http');
var https = require('https');
var morgan = require('morgan');  // Oferece registro para as requisições http do express
var restificando = require('restificando');
var express = require('express');
var sequelize = require('sequelize');
var registrador = require('./fonte/nucleo/registrador')('iniciar');  // Carregamos o nosso registrador
var ambiente = require('./configuracao/ambiente');  // Carregador das variaveis do ambiente
var entradas = require('./configuracao/entradas');  // Carregador das entradas na linha de comando

// Aqui nós iniciamos as variaveis do ambiente.
ambiente.iniciar(configuracao);

// Aqui nós iniciamos o suporte as entradas da linha de comando.
entradas.iniciar(configuracao, pastaDeConfiguracaoPadrao);

// Aqui carregamos o arquivo de configuração padrão.
configuracao.defaults(pastaDeConfiguracaoPadrao);

/* Carregamos assincronamente a nossa configuração e prosseguimos com a inicialização dos nossos serviços.
 *
 * @Parametro {Objeto} [args] Argumento passados
 * @Parametro {Objeto} [opcs] As opções dos argumentos.
 */
configuracao.load(function(args, opcs) {

  // Armazenamos aqui o endereço e nome do arquivo de configuração por meio dos argumentos informados.
  if(args.length > 0) {
    opcs.ARQUIVO_DE_CONFIGURACAO = args[args.length - 1];
  }

  // Faz a união ou substituição da configuração padrão com a configuração informada.
  if(opcs.ARQUIVO_DE_CONFIGURACAO !== pastaDeConfiguracaoPadrao) {
    configuracao.merge(require(opcs.ARQUIVO_DE_CONFIGURACAO));
  }
  
  // Iniciamos o servidor express
  var aplicativo = express();
  
  // Nossa configuração do servidor Express.
  var confDoServidor = configuracao.servidor;
  
  // Nossa configuração do CORS.
  var confDoCors = configuracao.servidor.cors;
  
  // Aqui temos as origens permitidas no nosso serviço CORS. Lembre-se que iremos oferecer dois tipos de conexões (http e https).
  var listaDasOrigensPermitidas = confDoCors.origem;

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
  , methods:  confDoCors.metodos // Métodos aceitos.
  , allowedHeaders: confDoCors.cabecalhosAceitos
  , exposedHeaders: confDoCors.cabecalhosExpostos  // Aqui teremos os cabeçalhos *expostos* para as requisições ao servidor HTTP. @Veja http://stackoverflow.com/a/15444439/4187180
  , credentials: confDoCors.seUsarCredenciais
  }));
  
  /* Aqui temos a nossa chave e certificado. Foi utilizado a ferramenta openssl provida pelo git. 
   * O comando para cria-los: openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privatekey.key -out certificate.crt
   * @Veja https://stackoverflow.com/questions/2355568/create-a-openssl-certificate-on-windows
   */
  var chavePrivada  = sistemaDeArquivo.readFileSync('./certificados/' + confDoServidor.certificados.chavePrivada, 'utf8');
  var certificado = sistemaDeArquivo.readFileSync('./certificados/' + confDoServidor.certificados.certificado, 'utf8');
  var credenciais = {key: chavePrivada, cert: certificado};
  
  // Utilizamos o bodyParser para receber requisições POST ou PUT.
  // Lembre-se de manter o limit do body em 200kb para nos precaver dos ataques de negação de serviço.
  var bodyParser = require('body-parser');
  aplicativo.use(bodyParser.json({limit: confDoServidor.limite}));
  aplicativo.use(bodyParser.urlencoded({limit: confDoServidor.limite, extended: false}));
  
  // Porta ao qual iremos receber requisições http.  
  aplicativo.set('porta', process.env.PORT || confDoServidor.porta);
  
  // Porta ao qual iremos receber requisições https.  
  aplicativo.set('portaSSL', process.env.SSLPORT || confDoServidor.portaSSL);
  
  // Adicionamos isso para realizar o registro de requisições.
  aplicativo.use(morgan(confDoServidor.registro || 'combined')); 
  
  // Aqui nós iremos obrigado que as conexões não seguras sejam redirecionadas.
  // Para mais informações @veja http://stackoverflow.com/a/10715802
  aplicativo.use(function(req, res, proximo) {
    // Se a requisição não for segura.
    if(!req.secure && confDoServidor.exigirConSegura) {
      // Aqui faremos redirecionar para uma conexão segura.
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    proximo();
  });
  
  // Iremos servir as páginas do diretorio "/testes"
  aplicativo.use('/testes', express.static(pasta.join(__dirname, 'testes')));  
  
  // Iremos servir as páginas do diretorio "testes/incluir/js/bibliotecas"
  aplicativo.use('/bibliotecas', express.static(pasta.join(__dirname, 'testes/incluir/js/bibliotecas'))); 

  // Iremos servir as páginas do diretorio "testes/incluir/estilos"
  aplicativo.use('/estilos', express.static(pasta.join(__dirname, 'testes/incluir/estilos'))); 
  
  // Chamamos o arquivo principal, ele vai carregar os outros arquivos principais do servidor.
  var principal = require('./fonte/iniciador/principal');
  
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
