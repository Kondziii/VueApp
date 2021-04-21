module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'order',
    {
      orderId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      approval_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      order_stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'order_state',
          key: 'order_stateId',
        },
      },
      user_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'Field user name cannot be empty.' },
        },
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Field email seems to be badly entered.',
          },
          notEmpty: { args: true, msg: 'Field email cannot be empty.' },
        },
      },
      phone_number: {
        type: DataTypes.CHAR(9),
        allowNull: false,
        validate: {
          is: {
            args: '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]',
            msg: 'Field phone number seems to be badly entered',
          },
          notEmpty: { args: true, msg: 'Field phone number cannot be empty.' },
        },
      },
    },
    {
      sequelize,
      tableName: 'order',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'orderId' }],
        },
        {
          name: 'order_stateId',
          using: 'BTREE',
          fields: [{ name: 'order_stateId' }],
        },
      ],
    }
  );
};
