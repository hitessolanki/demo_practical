const Sequelize = require('sequelize');
var sequelize = require('../config/db');

const User = sequelize.define('user', {
    // attributes
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
      },
      is_active: {
        type: Sequelize.INTEGER,
        default:1
      },
  }, {
    // options
  });
  module.exports=User;