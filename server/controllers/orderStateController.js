let models = require('../models/init-models');

module.exports.getAll = (req, res) => {
  models.order_state.findAll().then(function (states) {
    res.json(states);
  });
};
