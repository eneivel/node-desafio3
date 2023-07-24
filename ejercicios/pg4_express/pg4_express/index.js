// para manejar variables de ambiente
import * as dotenv from "dotenv";
dotenv.config();

// importar manejador de errores y modulos propios
import { handleErrors } from "./database/errors.js";
import { agregarPost, verPosts, unPost } from './database/consultas.js';

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

//1. GET para ver todos los viajes registrados en la tabla Posts, con try/catch para validar
app.get("/posts", async (req, res) => {
    try {
        const result = await verPosts();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Posts registrados en tabla", result }); 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});


//2. GET para ver un post en especifico de la tabla Posts usando parametro, con try/catch para validar
app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await unPost(id);
        return res.status(200).json({ ok: true, message: "Post existente", result });
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});



//3. POST para ingresar un post en la tabla Posts
app.post("/posts", async (req, res) => {
    const { titulo, imgSrc, descripcion, like_init } = req.body
    console.log("valor req.body recibido en la ruta /posts ", req.body)

    try {
        const result = await agregarPost({titulo, imgSrc, descripcion, like_init})
        return res.status(201).json({ ok: true, message: "Post agregado con exito", result }); //respuesta del servidor 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});




