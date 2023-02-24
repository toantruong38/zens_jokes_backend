const PORT = 3001;

const { conn } = require("./db.connection");

const app = require("./controllers/app.controller");
app.listen(PORT, () => console.log("app listening on", PORT));

process.on("exit", () => {
  conn.end();
});
process.on("SIGINT", () => {
  process.exit(0);
});
process.on("uncaughtException", (err) => {
  console.log("uncaught exception", err);
  process.exit(1);
});
