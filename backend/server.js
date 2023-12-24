const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { DB_URL, PORT, CORS_OPTIONS } = require("./config/configDb");

app.use(cors(CORS_OPTIONS));

mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send(process.env);
// });

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log("Server running...");
});
