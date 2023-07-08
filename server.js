const express = require("express");
const app = express();

const shorters = new Map(); // { id: url, expires: Date }

app.use(express.static("server"));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.get("/:id", (req, res) => {
  const id = req.params.id;
  if (shorters.has(id)) {
    return res.redirect(shorters.get(id).url);
  }
  res.sendFile(__dirname + "/server/404.html");
});

app.post("/shorten", (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).json({ error: "URL is required" });
  if (!url.startsWith("http"))
    return res.status(400).json({ error: "URL must start with http" });

  for (const [id, shorter] of shorters) {
    if (shorter.url === url) {
      return res.status(200).json({ id });
    }
  }

  let id;
  do {
    id = Math.random().toString(36).substring(2, 6).toUpperCase();
  } while (shorters.has(id) && shorters.get(id).expires > new Date());

  shorters.set(id, {
    url: url,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
  res.status(201).json({ id });
});

app.listen(3000);
