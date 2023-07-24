import * as dotenv from "dotenv";
dotenv.config();

import { handleErrors } from "./db/errors.js";
import { createTodo, getTodo, getTodos } from "./db/index.js";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, result: "todo ok en la ruta raíz" });
});

app.get("/todos", async (req, res) => {
  try {
    const result = await getTodos();
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, result: "error de servidor" });
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getTodo(id);
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await createTodo({ title, description });
    return res.status(201).json({ ok: true, result });
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("servidor listo en http://localhost:" + PORT);
});
