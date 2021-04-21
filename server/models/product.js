module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'product',
    {
      productId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'Field name cannot be empty.' },
        },
      },
      description: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'Field description cannot be empty.' },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          greaterThanZero: function (priceVal) {
            if (priceVal <= 0) {
              throw new Error('The price has to be a positive value.');
            }
          },
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          greaterThanZero: function (weightVal) {
            if (weightVal <= 0) {
              throw new Error('The weight has to be a positive value.');
            }
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'categoryId',
        },
      },
    },
    {
      sequelize,
      tableName: 'product',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'productId' }],
        },
        {
          name: 'categoryId',
          using: 'BTREE',
          fields: [{ name: 'categoryId' }],
        },
      ],
    }
  );
};
