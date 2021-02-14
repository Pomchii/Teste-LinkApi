const Pedidos = require("../model/pedidosModel");
const lib = require("pipedrive");
const axios = require("axios").default;

const convertXml = require("../utils/convertXml");

exports.postPedidos = async (req, res, next) => {
  try {
    const { status = "all_not_deleted" } = req.query;

    let deals = await lib.DealsController.getAllDeals({ status });

    if (!deals) {
      res.status(400).json("invalid status");
    }

    const allDeals = deals.data.map(async (deal) => {
      let blingOrder = {
        nome: deal.owner_name,
        codigo: deal.id,
        descricao: deal.title,
        vlrUnit: deal.value,
      };

      const xml = convertXml(blingOrder);

      await axios.post(
        `https://bling.com.br/Api/v2/pedido/json/?apikey=${process.env.BLING_TOKEN}&xml=${xml}`
      );

      const pedido = await Pedidos.findOne({ id_pedido: deal.id });
      if (!pedido) {
        await Pedidos.create({
          id_pedido: deal.id,
          cliente: {
            empresa: deal.org_name,
            pessoa: deal.person_name,
          },
          item: {
            codigo: blingOrder.codigo,
            descricao: deal.title,
            forma: deal.weighted_value_currency,
            total: deal.weighted_value,
          },
        });
      }
    });
    await Promise.all(allDeals);

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPedidos = (req, res, next) => {
  Pedidos.find()
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: "no data" });
      }

      res.status(200).json(response);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
