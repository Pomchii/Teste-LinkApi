const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const lib = require("pipedrive");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const routes = require("./routes/routes");

app.use(bodyParser.json());

lib.Configuration.apiToken = `${process.env.PIPEDRIVE_TOKEN}`;

app.use("/pedidos", routes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT);
