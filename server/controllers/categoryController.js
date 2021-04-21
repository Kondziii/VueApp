let models = require('../models/init-models');

module.exports.getAll = (req, res) => {
  models.category.findAll().then(function (categories) {
    res.json(categories);
  });
};
