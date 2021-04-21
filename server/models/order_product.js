module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'order_product',
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'order',
          key: 'orderId',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'productId',
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          greaterThanZero: function (amountVal) {
            if (amountVal <= 0) {
              throw new Error('The amount has to be a positive value!');
            }
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'order_product',
      timestamps: false,
      indexes: [
        {
          name: 'orderId',
          using: 'BTREE',
          fields: [{ name: 'orderId' }],
        },
        {
          name: 'productId',
          using: 'BTREE',
          fields: [{ name: 'productId' }],
        },
      ],
    }
  );
};
