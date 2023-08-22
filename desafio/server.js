require( 'dotenv' ).config()
const { addPost, getPosts } = require( './queries' )
const express = require( 'express' )
const app = express()
const cors = require( 'cors' )

const port = process.env.PORT || 3001
app.listen( port, console.log( `Servidor encendido en: http://localhost:${ port }` ) )

app.use( cors() )
app.use( express.json() )

app.get( '/posts', async ( req, res ) => {
  const posts = await getPosts()
  res.json( posts )
} )

app.post( '/posts', async ( req, res ) => {
  const { titulo, url, descripcion, likes } = req.body
  await addPost( titulo, url, descripcion, likes )
  res.status( 201 ).send( "Post agregado con éxito" )
} )
