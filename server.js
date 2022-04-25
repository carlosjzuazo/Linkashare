require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send({
    status: "ok",
    message: "Bienvenido a Linkashare.",
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: "K.O.",
    message: "No encontrado",
  });
});

const port = process.env.PORT;

app.listen(3000, () => {
  console.log(`API funcionando en http://127.0.0.1:${port} `);
});
