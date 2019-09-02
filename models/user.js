"use strict";
module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  user.associate = function (models) {
=======
  const user = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      location: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
>>>>>>> master
    // associations can be defined here
    user.hasMany(models.card_locations);
  };
  return user;
};
