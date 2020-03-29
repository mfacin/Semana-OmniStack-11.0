const knex = require('knex')
const configutation = require('../../knexfile')

const config = process.env.NODE_ENV === 'test' ? configutation.test : configutation.development

const connection = knex(config)

module.exports = connection