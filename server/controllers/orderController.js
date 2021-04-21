let models = require('../models/init-models');
const order = require('../models/order');

module.exports.getAll = (req, res) => {
  models.order
    .findAll({
      include: [{ model: models.order_state }, { model: models.product }],
    })
    .then(function (orders) {
      res.json(orders);
    })
    .catch(function (err) {
      res.status(404).json({ message: err.message });
      next(err);
    });
};

module.exports.store = (req, res) => {
  models.order_state
    .findOne({ where: { name: 'APPROVED' } })
    .then(function (state) {
      models.order
        .create({
          approval_date: new Date().toISOString().slice(0, 10),
          order_stateId: state.order_stateId,
          user_name: req.body.user_name,
          email: req.body.email,
          phone_number: req.body.phone_number,
        })
        .then(function (order) {
          res.json(order);
        })
        .catch(function (err) {
          res.status(400).json({ message: err.message });
          next(err);
        });
    });
};

module.exports.updateStateByID = (req, res) => {
  models.order
    .findOne({ where: { orderId: req.params.id } })
    .then(function (o) {
      if (o != null) {
        models.order
          .findOne({
            include: { model: models.order_state, where: { name: 'CANCELED' } },
            where: {
              orderId: req.params.id,
            },
          })
          .then(function (result) {
            if (result != null) {
              res.status(400).json({
                message:
                  'There is no possibility to change the state of canceled order.',
              });
              next();
            } else {
              models.order_state
                .findOne({
                  where: { name: req.params.state },
                  attributes: ['order_stateId'],
                })
                .then(function (state) {
                  if (state.order_stateId < o.order_stateId) {
                    res.status(400).json({
                      message:
                        "It's not possible to set this state for this order",
                    });
                  } else {
                    models.order
                      .update(
                        {
                          order_stateId: state.order_stateId,
                        },
                        {
                          where: {
                            orderId: req.params.id,
                          },
                        }
                      )
                      .then(() => {
                        return models.order.findOne({
                          where: { orderId: req.params.id },
                          include: models.order_state,
                        });
                      })
                      .then(function (order) {
                        res.json(order);
                      })
                      .catch(function (err) {
                        res.status(400).json({ message: err.message });
                        next(err);
                      });
                  }
                });
            }
          });
      } else {
        res.status(404).json({ message: "That order doesn't exist." });
      }
    });
};

module.exports.getByState = (req, res) => {
  models.order_state
    .findOne({
      where: { name: req.params.state },
      attributes: ['order_stateId'],
    })
    .then(function (state) {
      models.order
        .findAll({
          where: {
            order_stateId: state.order_stateId,
          },
          include: [{ model: models.order_state }, { model: models.product }],
        })
        .then(function (orders) {
          res.json(orders);
        })
        .catch(function (err) {
          res.status(400).json({ message: err.message });
          next(err);
        });
    });
};
