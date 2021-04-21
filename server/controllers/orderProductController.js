const models = require('../models/init-models');

module.exports.store = (req, res) => {
  models.product
    .findOne({ where: { productId: req.body.productId } })
    .then(function (product) {
      if (product != null) {
        models.order_product
          .create({
            orderId: parseInt(req.body.orderId),
            productId: parseInt(req.body.productId),
            amount: parseInt(req.body.amount),
          })
          .then(function (order) {
            res.json(order);
          })
          .catch(function (err) {
            res.status(400).json({ message: err.message });
          });
      } else {
        res.status(404).send({
          message: "Product that you wanna add to your order doesn't exist",
        });
      }
    });
};
