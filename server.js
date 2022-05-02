require("dotenv").config();

const { PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } = process.env;
const joi = require("@hapi/joi");
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const { getPool } = require("./data/getpool.js");
const sharp = require("sharp");
const url = require("url");
const controller = require("./controllers");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.fileUpload());

app.get("/posts", async (req, res) => {
  const pool = getPool();
  const [results] = await pool.query("SELECT * FROM posts");

  res.send(results);
});

app.get("/todayPosts", async (req, res) => {
  const pool = getPool();
  const [results] = await pool.query(
    "SELECT post FROM posts WHERE created_at = CURRENT_DATE()"
  );

  res.send(results);
});

app.post("/users", async (req, res) => {
  const pool = getPool();

  pool.query(
    "INSERT INTO users (user_name, email, user_password) VALUES (?, ?, ?)",
    [req.body.user_name, req.body.email, req.body.user_password]
  );
});

app.post("/users/avatar_images", async (req, res) => {
  const avatar = await sharp(req.files.avatar);
  const pool = getPool();
  const avatarPath = `./users/avatar_images/${user_name}.png`;
  avatar.tofile(`./users/avatar_images/${user_name}.png`);
  pool.query(`SET avatar = ${avatar}`);
});

app.post("/posts");

app.use((req, res) => {
  res.status(404).send({
    status: "K.O.",
    message: "No encontrado",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API funcionando en ${DATABASE_HOST}:${port} `);
});
