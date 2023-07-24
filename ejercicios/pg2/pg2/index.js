// importando modulos personalizados
import { agregarViaje, verViajes } from './consultas.js';

// importando express
import express from 'express';
const app = express();

// middleware para parsear body enviado al servidor
app.use(express.json())

// levantando servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server en puerto: http://localhost:${PORT}`);
})

//rutas del enrutador/ Api Rest, enlazar ruta con funcion BD

//1. GET para ver todos los viajes registrados en la tabla Viajes
app.get("/viajes", async (req, res) => {
    const viajes = await verViajes()
    res.json(viajes) //respuesta del servidor
})


//2. POST para ingresar un viaje en la tabla Viajes
app.post("/viajes", async (req, res) => {
    const { destino, presupuesto } = req.body
    console.log("valor req.body en la ruta /viajes: ", req.body)
    await agregarViaje({destino, presupuesto})  // llamado a la funcion de agregarViaje
    res.send("Viaje agregado con éxito")  // respuesta del servidor
})

