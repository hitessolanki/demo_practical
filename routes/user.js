
const user = require('../controllers/user');
const auth = require('../middleware/auth');



module.exports = app => {
  app.post('/api/user/register_user',  user.registerUser);
  app.post('/api/user/login',  user.login);
  //Middleware created
  app.post('/api/user/get_user_list',auth.authenticateToken, user.userList);
}
