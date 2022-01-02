const Sequelize = require('sequelize');
var sequelize = require('../config/db');

const User = sequelize.define('user_tokens', {
  // attributes
  token: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    allownull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  is_active: {
    type: Sequelize.INTEGER,
    default: 1
  },
}, {
  // options
});

module.exports = User;