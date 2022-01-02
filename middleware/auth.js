const jwt = require('jsonwebtoken');
const secret={
    TOKEN_SECRET:"09f26e402586e2faa8da4c98a35f1b20d6b033c60123"
};
var auth = {
    authenticateToken(req, res, next) {
        const token = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            var response =
          {
            "code": "-1",
            "message": "unauthorized"
          }
          res.status(401);
          res.json(response);
        }
        jwt.verify(token, secret.TOKEN_SECRET , (err, user) => {
            // console.log('user',user);
            console.log('err', err);
            if (err) {
                var response =
                {
                  "code": "-1",
                  "message": "unauthorized"
                }
                res.status(401);
                res.json(response);
            }
            // res.sendStatus(403);
            req.user = user;
            // console.log('req', req);
            next()
        })
    }
}
module.exports = auth;