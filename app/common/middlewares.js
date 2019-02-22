var jwt = require('jsonwebtoken'),
    role = require('../infra/models/role');

const middleware = {
    auth:  () => {
        return function (req, res, next) {
            var token = req.body.token || req.query.token || req.headers['token'];
            var request_type = req.query.request_type;
            if (token) {
              jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) {        
                  return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                  });
                } else {
                    
                    role.findOne({role_code : decoded.User.role_code}, function (e, result) {
                    if (e) {
                      return res.status(403).send({
                        success: false,
                        message: 'Unathorized rolE'
                      });
                    }
                    if(result){
                        if(result.role_entity_access.indexOf(request_type) != -1 || result.role_entity_access.indexOf('ALL') != -1 || result.role_entity_access === 'app__settings')
                    {
                      req.LoggedInUser = decoded.User;
                      next();
                    }
                    else {
                      return res.status(403).send({
                        success: false,
                        message: 'Authorization is failed. User role dont have sufficient rights.'
                      });
                     }
                    }
                    else
                    {
                        return res.status(403).send({
                            success: false,
                            message: 'Unathorized role'
                          });
                    }
                  });
                }
      
      
              });
      
            } else {
      
              // if there is no token
              // return an error
              return res.status(403).send({
                success: false,
                message: 'No token provided.'
              });
      
            }
          }
    }
}


module.exports = middleware;