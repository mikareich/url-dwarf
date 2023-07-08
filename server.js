const express = require("express");
const app = express();

const shorters = [];

app.use(express.static("server"));

app.use(express.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.get("/:id", (req, res) => {
  if (shorters[req.params.id]) return res.redirect(shorters[req.params.id]);
  res.sendFile(__dirname + "/server/404.html");
});

app.post("/shorten", (req, res) => {
  if (!req.body.url) return res.status(400).json({ error: "URL is required" });
  let id;
  do id = Math.random().toString(36).substring(2, 6).toUpperCase();
  while (shorters[id]);
  shorters[id] = req.body.url;
  res.status(201).json({ id });
});

app.listen(3000);
