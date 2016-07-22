/* Exporta objeto contendo os dados de configuração para o nosso servidor.
 *
 * @Arquivo configuracao.js 
 */

/* Aqui temos a configuração do nosso serviço.
 *
 * @Diretiva {armazenamento} O nosso sistema de armazenamento.
 *  - armazenamento.dialeto  (Obrigatório) O dialeto usado. Podendo ser: mysql, postgres ou então sqlite.
 *  - armazenamento.porta    (Opcional e Recomendado) A porta utilizada para conexão com o nosso banco de dados. Exeto para o SQlite.
 *  - armazenamento.endereco (Opcional e Recomendado) O endereço do nosso banco de dados. Exeto para o SQlite.
 *  - armazenamento.senha    (Obrigatório) A nossa senha de conexão com o banco. Exeto para o SQlite.
 *  - armazenamento.database (Obrigatório) O nome do banco utilizado.
 *  - armazenamento.usuario  (Obrigatório) O nome do usuário do banco. Exeto para o SQLite.
 *
 * @Diretiva {servidor} O nosso servidor http.
 *  - servidor.porta                     (Obrigatório) A porta onde o serviço irá esperar por requisições http.
 *  - servidor.portaSSL                  (Obrigatório) A porta ao qual o servidor irá esperar por requisições https.
 *  - servidor.limite                    (Obrigatório) Valor limite do body que é permitido. Mantenha o valor baixo para precaver
 *                                                     contra negação de serviços.
 *  - servidor.exigirConSegura           (Obrigatório) Se for necessário obrigar uma conexão segura.
 *  - servidor.cors                      (Opcional) Se iremos oferecer o serviço cors.
 *  - servidor.cors.origem               (Obrigatório) O endereço de origem que é permitidos pelo cors. Por questões de segurança, 
 *                                                     utilize *apenas* para a fase de desenvolvimento e testes.
 *  - servidor.cors.metodos              (Obrigatório) Os métodos de requisição aceitos. 
 *  - servidor.cors.cabecalhosAceitos    (Obrigatório) Os cabeçalhos aceitos.
 *  - servidor.cors.cabecalhosExpostos   (Obrigatório) Aqui teremos os cabeçalhos *expostos* para as requisições ao servidor HTTP.
 *  - servidor.cors.credenciais          (Obrigatório)
 *  - servidor.registro                  (Opcional) Formatos de registro do morgan. podendo ser: 'default', 'short', 'tiny', 'dev' etc.
 *  - servidor.certificados.chavePrivada (Obrigatório) A chave privada.
 *  - servidor.certificados.certificado  (Obrigatório) O certificado.
 *
 * @Diretiva {servidorRest} O nosso servidor Restificando.
 *  - servidorRest.base  (Opcional) A nossa base do serviço restificando. ex. /listificando
 */
module.exports = {
  
  // Armazenamento: Armazenamento para os dados, este servidor utiliza Sequelize.
  "armazenamento": {
    "dialeto": "mysql",                // Dialeto utilizado, pode ser MySQL, SQlite e Postgres.
    "usuario": "leo",                  // Nome do usuário do banco de dados, não é necessário para o SQlite.
    "senha": "montes",                 // Senha do usuário do banco de dados, não é necessário para o SQlite.
    "database": "database",            // Nome do nosso banco de dados.
    "maxDeConsultasConcorrentes": 200, // Valor máximo de consultas concorrentes.
    "maxDeConexoes": 1,                // Valo máximo de conexões.
    "maxTempInativo": 30,              // Tempo máximo inativo.
    "endereco": "127.0.0.1",           // Endereço ao qual utilizaremos para a conexão com o banco de dados.
    "porta": 3306                      // A porta ao qual utilizaremos para a conexão com o banco de dados.
  },
  
  // Servidor: As configurações para o Express.
  "servidor": {
    "registro": "combined",  // Formatos de registro do morgan. valores permitidos: 'combined', 'common', 'default', 'short', 'tiny', 'dev' etc.
    "porta": 80,             // A porta ao qual o servidor irá escutar por requisições http.
    "portaSSL": 443,         // A porta ao qual o servidor irá esperar por requisições https.
    "limite": "200kb",       // Limite permitido para o conteúdo body. Lembre-se de manter o limit do body em 
                             // '200kb' para nos precaver dos ataques de negação de serviço.
    "exigirConSegura": true, // Se for necessário obrigar uma conexão segura.
    "cors": {                         
      "origem": ["http://localhost", "https://localhost"],
      "metodos": ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],  
      "cabecalhosAceitos": ['Content-Range', 'X-total', 'Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'],
      "cabecalhosExpostos": ['Content-Range', 'X-total'], 
      "seUsarCredenciais": true
    },
    "certificados": {                      // Certificados utilizados para o servidor https.
      "chavePrivada": "servidorHttps.key", // A chave privada.
      "certificado": "servidorHttps.crt"   // O certificado.
    }
  },
  
  // ServidorRest: As configurações do nosso servidor Restificando.
  "servidorRest": {
    "base": ""
  }
  
};