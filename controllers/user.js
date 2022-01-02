var userModel = require('../model/user');
var userToken = require('../model/user_token');
var fs = require('fs');
const async = require('async');
const auth1 = { TOKEN_SECRET: "09f26e402586e2faa8da4c98a35f1b20d6b033c60123" };
var userservice = require("../services/user");

var user =
{
  /**
   * 
   * @param {req} req 
   * @param {res} res 
   * @description This api use for register user
   */
  registerUser: function (req, res) {
    userservice.createUser(req.body, function (_err, _result) {
      if (_result) {
        var response =
        {
          "code": 1,
          "message": "User has been created successfully."
        }
        if (_result != null) {
          response["data"] = _result;
        }
        // console.log('response', response);
        res.json(response);
      } else {
        var response =
        {
          "code": 0,
          "message": "Email already exist!."
        }
        res.json(response);
      }

    });
  },
  /**
   * 
   * @param {req} req 
   * @param {res} res 
   * @description This api use for login user
   */
  login: function (req, res) {
    userservice.signIn(req.body, function (_err, _result) {
      var response =
      {
        "code": 1,
        "message": "Login successfully."
      }
      if (_result != null) {
        response["data"] = _result;
      }
      res.json(response);
    })
  },
  /**
  * 
  * @param {req} req 
  * @param {res} res 
  * @description This api use for user list
  */
  userList: function (req, res) {
    var page = parseInt(req.body.page_token);
    userservice.getUserList(req.body, function (_err, _res) {
      var response =
      {
        "code": 1,
        "message": "User list"
      }
      if (_res != null) {
        response["data"] = _res;
        response['page_token'] = page + 1;
      }
      res.json(response);
    });
  }
}
module.exports = user;