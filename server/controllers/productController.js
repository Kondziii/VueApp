let models = require('../models/init-models');

module.exports.getAll = (req, res) => {
  models.product
    .findAll({ include: models.category })
    .then(function (products) {
      res.json(products);
    });
};

module.exports.getById = (req, res) => {
  models.product
    .findOne({ where: { productId: req.params.id }, include: models.category })
    .then(function (product) {
      res.json(product);
    });
};

module.exports.store = (req, res) => {
  models.product
    .create({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      weight: parseFloat(req.body.weight),
      categoryId: parseInt(req.body.categoryId),
    })
    .then(function (product) {
      res.json(product);
    })
    .catch(function (err) {
      res.status(400).json({ message: err.message });
      next(err);
    });
};

module.exports.updateById = (req, res) => {
  models.product
    .update(
      {
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        weight: parseFloat(req.body.weight),
        categoryId: parseInt(req.body.categoryId),
      },
      {
        where: {
          productId: req.params.id,
        },
      }
    )
    .then(() => {
      return models.product.findOne({
        where: { productId: req.params.id },
        include: models.category,
      });
    })
    .then(function (product) {
      if (product == null) {
        res.status(404).json({ message: "That product doesn't exist" });
        next();
      }
      res.json(product);
    })
    .catch(function (err) {
      res.status(400).json({ message: err.message });
      next(err);
    });
};
