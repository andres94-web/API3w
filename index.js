import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de gestion de eventos");
});

app.get("/eventos", (req, res) => {
  const data = readData();
  res.json(data.eventos);
});

app.get("/eventos/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const evento = data.eventos.find((evento) => evento.id === id);
  res.json(evento);
});

app.post("/eventos", (req, res) => {
  const data = readData();
  const body = req.body;
  const newevento = {
    id: data.eventos.length + 1,
    ...body,
  };
  data.eventos.push(newevento);
  writeData(data);
  res.json(newevento);
});

app.put("/eventos/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const eventoIndex = data.eventos.findIndex((evento) => evento.id === id);
  data.eventos[eventoIndex] = {
    ...data.eventos[eventoIndex],
    ...body,
  };
  writeData(data);
  res.json({ message: "evento actualizado con exito" });
});

app.delete("/eventos/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const eventoIndex = data.eventos.findIndex((evento) => evento.id === id);
  data.eventos.splice(eventoIndex, 1);
  writeData(data);
  res.json({ message: "evento eliminado con exito" });
});

app.listen(9000, () => {
  console.log("Servidor escuchando en el puerto 9000");
});
