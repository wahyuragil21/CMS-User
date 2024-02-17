'use strict';
const {
  Model
} = require('sequelize');
const { hasPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class tbl_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_user.init({
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required!'
        },
        notNull: {
          msg: 'Name is required!'
        }
      }
    },
    password: {
      type: DataTypes.STRING(54),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required!'
        },
        notNull: {
          msg: 'Password is required!'
        },
        len: {
          args: [5, 8],
          msg: 'Password must be between 5 and 8 characters!'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate : (user, options) => {
        user.password = hasPassword(user.password)
      }
    },
    sequelize,
    modelName: 'tbl_user',
  });
  return tbl_user;
};