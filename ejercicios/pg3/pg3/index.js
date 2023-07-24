// para manejar variables de ambiente
import * as dotenv from "dotenv";
dotenv.config();

// importar manejador de errores y modulos propios
import { handleErrors } from "./database/errors.js";
import { agregarViaje, verViajes, unViaje } from './database/consultas.js';

// Importar express y cors
import express from "express";
import cors from "cors";
const app = express();

// middleware de cors y de parseo del body
app.use(cors());
app.use(express.json());


// levantando servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server en puerto: http://localhost:${PORT}`);
})

//rutas del enrutador/ Api Rest, enlazar ruta con funcion BD

//0. GET para ver ruta raiz
app.get("/", (req, res) => {
    res.json({ ok: true, result: "Acceso permitido a ruta raiz" });
});

//1. GET para ver todos los viajes registrados en la tabla Viajes, con try/catch para validar
app.get("/viajes", async (req, res) => {
    try {
        const result = await verViajes();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Viajes registrados en tabla", result }); 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});


//2. GET para ver un viaje en especifico de la tabla Viajes usando parametro, con try/catch para validar
app.get("/viajes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await unViaje(id);
        return res.status(200).json({ ok: true, message: "Registro existente", result });
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});



//3. POST para ingresar un viaje en la tabla Viajes
app.post("/viajes", async (req, res) => {
    const { destino, presupuesto } = req.body
    console.log("valor req.body en la ruta /viajes: ", req.body)

    try {
        const result = await agregarViaje({destino, presupuesto})
        return res.status(201).json({ ok: true, message: "Viaje agregado con exito", result }); //respuesta del servidor 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});




