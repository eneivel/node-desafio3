// La clase Pool nos permite soportar multiconexiones y un mejor rendimiento en las consultas desde paquete pg
import pkg from 'pg';
const { Pool } = pkg;

// definimos el objeto de conexion pool
const pool = new Pool({
    host: 'localhost',  //servidor local de maquina
    user: 'postgres',
    password: '1234',  // el password de cada no
    database: 'plan_de_viajes', // DB debe existir
    port: 5433,
    allowExitOnIdle: true  // cerrar sesion de conexion despues de cada consulta
})



// funcion para insertar un viaje en la tabla en forma de parametros
const agregarViaje = async ({destino, presupuesto}) => {
    console.log("Entro agregarViaje: ", destino, presupuesto)
    //const consulta = "INSERT INTO viajes values (DEFAULT, $1, $2)" // instruccion SQL
    const consulta = "INSERT INTO viajes values (DEFAULT, $1, $2) RETURNING *" // instruccion SQL
    const values = [destino, presupuesto] // componentes de values que son los parametros de la funcion
    const result = await pool.query(consulta, values) // la consulta requiere 2 argumentos
    console.log("---------------------------------------------------------------")
    console.log("Viaje agregado")
    console.log("Objeto devuelto de la consulta: ",result)
    console.log("Instruccion procesada: ", result.command)
    console.log("Filas procesadas: ",result.rowCount)
    console.log("Informacion ingresada: ",result.rows[0])
    console.log("----------------------------------------------------------------")
}


// funcion listar el contenido de la tabla
const verViajes = async () => {
    const { rows, command, rowCount, fields } = await pool.query("SELECT * FROM viajes"); //destructuring
    console.log("----------------------------------------------")
    console.log("Viajes registrados en la tabla")
    console.log("Instruccion procesada: ", command)
    console.log("Filas procesadas: ",rowCount)
    console.log("Contenido procesado: ", rows)
    console.log("Campos procesados: ",fields)
    console.log("----------------------------------------------")
    
    return rows
};


// funcion autoinvocada
/* (async () => {
    await agregarViaje({ destino: "Cancún", presupuesto: 1000000 });
    await verViajes();
})();
 */


export {agregarViaje, verViajes}