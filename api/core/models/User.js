module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userUid: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'user_uid',
    },
    userName: {
      type: DataTypes.STRING,
      field: 'name',
    },
  }, {
    createdAt: 'created_at',
    updatedAt: 'last_updated_at',
    tableName: 'users',
    schema: 'devconnector',
  });

  // Associate example
  // belongsTo
  // User.associate = (models) => {
  //   User.belongsTo(models.Product, {
  //     foreignKey: 'product_uid',
  //   });

  // belongsToMany
  //   User.belongsToMany(models.Order, {
  //     through: models.UserOrder,
  //     primaryKey: false,
  //     foreignKey: 'product_uid',
  //   });

  // ... Dúvida ...
  //   User.hasMany(models.AddressZones, {
  //     primaryKey: false,
  //     foreignKey: 'address_uid',
  //   });
  // };

  return User;
};
