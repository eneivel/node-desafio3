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


// funcion para obtener la fecha usando metodo query de consulta e instrucciones de Postgre Sql
const getDate = async () => {
    // objeto result devuelto al realizar la consulta
    const result = await pool.query("SELECT NOW()")  // proceso asincrono

    // mostrando el objeto completo, propiedades como command, rows, rowCount
    console.log("Objeto devuelto de la consulta: ",result)
}

// llamado inicial a funcion una vez ejecutado consultas.js
getDate()


// funcion para insertar un viaje en la tabla en forma de parametros
const agregarViaje = async (destino, presupuesto) => {
    const consulta = "INSERT INTO viajes values (DEFAULT, $1, $2)" // instruccion SQL
    const values = [destino, presupuesto] // componentes de values que son los parametros de la funcion
    const result = await pool.query(consulta, values) // la consulta requiere 2 argumentos
    console.log("----------------------------------------------")
    console.log("Viaje agregado")
    console.log("Objeto devuelto de la consulta: ",result)
    console.log("Instruccion procesada: ", result.command)
    console.log("Filas procesadas: ",result.rowCount)
    console.log("----------------------------------------------")
}



//llamando a la funcion agregarViaje pasando unos argumentos 
agregarViaje("Panama",900000)






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

//llamado a funcion verViajes
//verViajes()


// funcion autoinvocada
/* (async () => {
    await agregarViaje({ destino: "Cancún", presupuesto: 1000000 });
    await verViajes();
})();
 */
