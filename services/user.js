var jwt = require('jsonwebtoken');
var userModel = require('../model/user');
var userToken = require('../model/user_token');
const auth1 = { TOKEN_SECRET: "09f26e402586e2faa8da4c98a35f1b20d6b033c60123" };
const GLOBALS = { page: 10 };
var common = {
    createUser: function (userObj, next) {
        var token = jwt.sign({ email: userObj.email }, auth1.TOKEN_SECRET);
        //Check email exist or not
        common.findBYUserEmail(userObj.email, function (_err, _result) {
            if (!_result) {
                var dataUser = {
                    first_name: userObj.first_name,
                    last_name: userObj.last_name,
                    password: userObj.password,
                    phone_number: userObj.phone_number,
                    email: userObj.email,
                };

                userModel.create(dataUser).then((user) => {
                    console.log('user', user);
                    var dataDevice = {
                        userId: user.dataValues.id,
                        token: token,
                    }
                    userToken.create(dataDevice).then((userDbo) => {
                        common.findBYUserID(dataDevice.userId, function (_err, userRes) {
                            userRes.dataValues.token = dataDevice.token;
                            next(undefined, userRes);
                        });
                    });
                });

            } else {
                next(undefined, undefined);
            }
        });

    },
    findBYUserEmail: function (email, next) {
        userModel.findOne({ where: { email: email } }).then(function (user) {
            if (user != null) {
                next(undefined, true);
            } else {
                next(undefined, false);
            }
        });
    },
    findBYUserID: function (id, next) {
        userModel.findOne({ where: { id: id } }).then(function (user) {
            if (user != null) {
                next(undefined, user);
            }
        });
    },
    signIn: function (params, next) {
        userModel.findOne({ where: { email: params.email, password: params.password } }).then(function (user) {
            if (user != null) {
                userToken.findOne({ where: { userId: user.dataValues.id } }).then(function (userDevice) {
                    user.dataValues.token = userDevice.dataValues.token;
                    next(undefined, user);
                });
            }
        })
    },
    getUserList(params, next) {
        var page = parseInt(params.page_token);
        userModel.findAll({ where: { is_active: 1 }, offset: (page * GLOBALS.page), limit: GLOBALS.page }).then(function (user) {
            if (user != null) {
                next(undefined, user);
            }
        });
    }

}
module.exports = common;