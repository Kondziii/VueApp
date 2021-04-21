let DataTypes = require('sequelize').DataTypes;
let _order_state = require('./order_state');
let _product = require('./product');
let _category = require('./category');
let _order = require('./order');
let _order_product = require('./order_product');
const connection = require('../config/database');

function initModels(sequelize) {
  let order_state = _order_state(sequelize, DataTypes);
  let category = _category(sequelize, DataTypes);
  let product = _product(sequelize, DataTypes);
  let order = _order(sequelize, DataTypes);
  let order_product = _order_product(sequelize, DataTypes);

  category.hasMany(product, { foreignKey: 'categoryId' });
  product.belongsTo(category, { foreignKey: 'categoryId' });

  order_state.hasMany(order, { foreignKey: 'order_stateId' });
  order.belongsTo(order_state, { foreignKey: 'order_stateId' });

  order.belongsToMany(product, {
    through: order_product,
    foreignKey: 'orderId',
  });
  product.belongsToMany(order, {
    through: order_product,
    foreignKey: 'productId',
  });

  return {
    category,
    product,
    order_state,
    order,
    order_product,
  };
}
module.exports = initModels(connection);
