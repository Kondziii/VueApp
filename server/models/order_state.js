module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'order_state',
    {
      order_stateId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          isIn: [['DISAPPROVED', 'APPROVED', 'CANCELED', 'REALIZED']],
        },
      },
    },
    {
      sequelize,
      tableName: 'order_state',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'order_stateId' }],
        },
      ],
    }
  );
};
