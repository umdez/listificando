'use strict';

/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id entradas.js, criado em 21/07/2016 às 11:59 por Leo Felippe $
 *
 * Versão atual 0.0.1-Beta
 */
 
var entradas = {};

entradas.iniciar = function(configuracao, pastaDeConfiguracaoPadrao) {
  
  this.iniciarAsEntradas(configuracao, pastaDeConfiguracaoPadrao);
};

entradas.iniciarAsEntradas = function (configuracao, pastaDeConfiguracaoPadrao) {

  /* Nossas opções de entrada para configuração pela linha de comando. 
   * 
   * O comando de entrada é: node iniciar -opção valor
   * O comando de ajuda é: node iniciar -help
   *
   * Para mais informações veja o arquivo configuracao.js ou https://github.com/dodo/node-jsconfig#configcli
   */ 
  configuracao.cli({
    
    // O arquivo de configuração.
       ARQUIVO_DE_CONFIGURACAO: ['cfgarq', "Endereço da pasta e nome do arquivo de configuracao", 'path', pastaDeConfiguracaoPadrao] 
       
    // Configurações do nosso Banco de Dados.   
    ,  DIALETO_DO_BD:  ['armazenamento.dialeto', ['dialdb', "O dialeto utilizado, pode ser mysql, sqlite e postgres", 'string']]
    ,  USUARIO_DO_BD:  ['armazenamento.usuario', ['usrobd', "O nome do usuário do banco de dados", 'string']]
    ,  SENHA_DO_BD:    ['armazenamento.senha', ['senhbd', "A senha do usuário do banco de dados", 'string']]
    ,  NOME_DO_BD:     ['armazenamento.database', ['nomebd', "O nome do nosso banco de dados", 'string']]
    ,  ENDERECO_DO_BD: ['armazenamento.endereco', ['endebd', "O endereço ao qual utilizaremos para a conexão com o banco de dados", 'string']]         
    ,  PORTA_DO_BD:    ['armazenamento.porta', ['prtabd', "A porta do nosso banco de dados", 'int']]
    
    // Configurações do nosso servidor express.
    ,  REGISTRO_DO_SRV:        ['servidor.registro', ['regsrv', "O formato de registro do morgan", 'string']]
    ,  PORTA_DO_SRV:           ['servidor.porta', ['prtsrv', "A porta ao qual o servidor irá escutar por requisições http", 'int']]
    ,  PORTA_SSL_DO_SRV:       ['servidor.portaSSL', ['ptssrv', "A porta ao qual o servidor irá esperar por requisições https", 'int']]
    ,  LIMITE_DO_CORPO_DO_SRV: ['servidor.limite', ['limsrv', "O limite permitido para o conteúdo body", 'string']]
    ,  EXIGIR_CONEX_SEGURA:    ['servidor.exigirConSegura', ['excseg', "Se for necessário exigir uma conexão segura", 'bool']]
    
    // Configurações do Cors.
    ,  CREDENCIAIS_DO_CORS:     ['servidor.cors.credenciais', ['crdcor', "Se utilizar credenciais no cors", 'bool']]
    
    // Configurações do certificado.
    ,  CHAVE_PRIV_DO_SRV: ['servidor.certificados.chavePrivada', ['cvpsrv', "A chave privada", 'string']]
    ,  CERTIFICADO_DO_SRV: ['servidor.certificados.certificado', ['crtsrv', "O certificado", 'string']]
    
    // Configurações do serviço restificando
    ,  ENDE_DO_REST: ['servidorRest.endereco', ['endsrt', "O endereço do restificando", 'string']]
    
  });

};

module.exports = entradas;