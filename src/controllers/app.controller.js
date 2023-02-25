const jokesService = require("../services/jokes.service");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const sendSimpleError = (res) => {
  res.status(500).json({ message: "Internal error" });
};

app.get("/api/jokes", async (req, res) => {
  jokesService
    .getJokes()
    .then((jokes) => res.status(200).json({ jokes }))
    .catch(() => sendSimpleError(res));
});

app.post("/api/vote", async (req, res) => {
  const { id, vote } = req.body;

  if (!id || Number.isNaN(id) || !["positive", "negative"].includes(vote)) {
    res.status(400).json({ message: "Bad input" });
    return;
  }

  if (!(await jokesService.jokeExists(id))) {
    res.status(400).json({ message: "Joke doesn't exist" });
    return;
  }

  const result = await jokesService.voteJoke(id, vote);
  res.status(200).json(result);
});

module.exports = app;
