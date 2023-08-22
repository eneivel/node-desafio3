const pool = require( './basededatos' )

const addPost = async ( titulo, url, descripcion, likes ) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
  const values = [ titulo, url, descripcion, likes ]
  await pool.query( consulta, values )
  console.log( 'post agregado' )
}

const getPosts = async () => {
  const { rows } = await pool.query( "SELECT * FROM posts" )
  console.log( rows )
  return rows
}

module.exports = {
  addPost,
  getPosts
}