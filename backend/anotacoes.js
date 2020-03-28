/**
* Recursos e Rotas
* 
* Recurso: o caminho depois da rota (/users)
* Rota: o conjunto completo (http://192.268.0.21)
*/

/**
* Métodos HTTP:
* 
* GET: Buscar uma informação no backend
* POST: Criar uma informação no backend
* PUT: Alterar uma informação no backend
* DELETE: Deletar uma informação no backend
*/

/**
* Tipos de parâmetros:
* 
* Query Params: Parâmetros nomeados enviados através da rota depois do "?" (filtros, paginação)
* Route Params: Parâmetros utilizados para identificar recursos
* Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/**
* Banco de Dados:
* 
* SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
* NoSQL: MongoDB, CoughDB, etc
*/

/**
* Driver: SELECT * FROM users
* Query Builder: table('users').select('*').where('...')
*/

/**
 * Comandos do banco de dados:
 * 
 * Criar migration: npx knex migrate:make [nome da migrate]
 * Executar migration up(): npx knex migrate:latest
 * Desfazer última alteração: npx knex migrate:rollback 
 * Listar migrations executadas: npx knex migrate:status
 */