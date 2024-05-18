import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
app.use(bodyParser.json());
app.use(cors())

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

app.get("https://api-eventos-3-w.onrender.com", (req, res) => {
  /* app.get("/", (req, res) => { */
  res.send("Bienvenido a la API de gestion de eventos");
});

app.get("https://api-eventos-3-w.onrender.com/eventos", (req, res) => {
  /* app.get("/eventos", (req, res) => { */
  const data = readData();
  res.json(data.eventos);
});

app.get("https://api-eventos-3-w.onrender.com/eventos/:id", (req, res) => {
  /* app.get("/eventos/:id", (req, res) => { */
  const data = readData();
  const id = parseInt(req.params.id);
  const evento = data.eventos.find((evento) => evento.id === id);
  res.json(evento);
});

app.post("https://api-eventos-3-w.onrender.com/eventos", (req, res) => {
  /* app.post("/eventos", (req, res) => { */
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

app.put("https://api-eventos-3-w.onrender.com/eventos/:id", (req, res) => {
  /* app.put("/eventos/:id", (req, res) => { */
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

app.delete("/https://api-eventos-3-w.onrender.com/eventos/:id", (req, res) => {
  /* app.delete("/eventos/:id", (req, res) => { */
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
/* 
{
  "id": 1,
  "titulo": "mis 15",
  "descripcion": "lluvia de sobres, solo personas con invitacion",
  "fecha": "2024-06-01",
  "hora": "19:00",
  "ubicacion": "finca las palmas nariño",
  "categoria": "15 Años"
},
{
  "id": 2,
  "titulo": "disfraces locos",
  "descripcion": "trae tu mejor disfras no te cohibas",
  "fecha": "2024-06-01",
  "hora": "21:00",
  "ubicacion": "centro comercial la 14",
  "categoria": "Disfraces"
},
{
  "id": 3,
  "titulo": "bebe a bordo",
  "descripcion": "en mi baby shower quiero que me acompañen los seres queridos de mis papis",
  "fecha": "2024-06-29",
  "hora": "15:00",
  "ubicacion": "cll 22 b/palo santo #22-22",
  "categoria": "Baby Shower"
} */