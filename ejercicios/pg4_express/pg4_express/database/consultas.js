// La clase Pool nos permite soportar multiconexiones y un mejor rendimiento en las consultas desde paquete pg
import pkg from 'pg';
const { Pool } = pkg;

// definimos el objeto de conexion pool
const pool = new Pool({
    host: 'localhost',  //servidor local de maquina
    user: 'postgres',
    password: '1234',  // el password de cada no
    database: 'likeme', // DB debe existir
    port: 5433,
    allowExitOnIdle: true  // cerrar sesion de conexion despues de cada consulta
})



// funcion para insertar un viaje en la tabla en forma de parametros
const agregarPost = async ({titulo, imgSrc, descripcion, like_init}) => {
    console.log("Entro agregarPost: ", titulo, imgSrc, descripcion, like_init)

    // validacion por si falta informacion principal del body
    if (!titulo || !imgSrc) {
        throw { code: "400" };   //repuesta de la funcion
    }

    //const consulta = "INSERT INTO viajes values (DEFAULT, $1, $2)" // instruccion SQL
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *" // instruccion SQL
    const values = [titulo, imgSrc, descripcion, like_init] 
    const result = await pool.query(consulta, values) // la consulta requiere 2 argumentos
    console.log("---------------------------------------------------------------")
    console.log("Objeto devuelto de la consulta: ",result)
    console.log("Instruccion procesada: ", result.command)
    console.log("Filas procesadas: ",result.rowCount)
    console.log("Informacion ingresada: ",result.rows[0])
    console.log("----------------------------------------------------------------")

    return result.rows[0]   //repuesta de la funcion
}




// funcion ver el contenido de un registro especifico por su id
const unPost = async (id) => {

    const text = "SELECT * FROM posts WHERE id = $1";
    const { rows, command, rowCount } = await pool.query(text, [id]); //destructuring
    console.log("----------------------------------------------")
    console.log("Instruccion procesada: ", command)
    console.log("Filas procesadas: ",rowCount)
    console.log("Informacion obtenida ", rows)
    console.log("----------------------------------------------")

    // validacion por si retorna rows vacio
    if (rows.length === 0) {
        throw { code: "404" }; //repuesta de la funcion
    }
    
    return rows[0]  //repuesta de la funcion
};

// funcion ver todos los registros de la lista
const verPosts = async () => {
    const { rows, command, rowCount } = await pool.query("SELECT * FROM posts"); //destructuring
    console.log("----------------------------------------------")
    console.log("Instruccion procesada: ", command)
    console.log("Filas procesadas: ",rowCount)
    console.log("informacion obtenida: ", rows)
    console.log("----------------------------------------------")
    
    return rows;   //repuesta de la funcion
};




export {agregarPost, verPosts, unPost}