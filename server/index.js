const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  "/public/",
  express.static(path.resolve(__dirname, "../client/public"))
);

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../client/public/index.html"))
);

app.listen(process.env.port || 3000, () => {
  console.log("App listening on :3000...");
});
