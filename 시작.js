const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("<h1>hello 시발</h1>");
});

app.listen(3000, () => {
  console.log("server is listening....");
});
