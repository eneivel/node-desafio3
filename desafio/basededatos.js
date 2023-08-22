
require( 'dotenv' ).config()
const { Pool } = require( 'pg' )

const pool = new Pool( {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'likeme',
  allowExitOnIdle: true
} )

module.exports = pool