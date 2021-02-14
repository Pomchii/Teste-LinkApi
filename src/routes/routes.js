const express = require("express");
const pedidosController = require("../controller/pedidosController");

const routes = express.Router();

routes.post("/", pedidosController.postPedidos);
routes.get("/", pedidosController.getPedidos);

module.exports = routes;
