const user = require("../models/user"),
  common = require("../../common/index"),
  role = require("../models/role"),
  jwt = require("jsonwebtoken"),
  appsettings = require("../business/appsettings"),
  viewHelper = require("../../common/helper");
module.exports = {
  role__create: async req => {
    return await role.create(req.request_data);
  },
  role__delete: async req => {
    return await role.delete(req.request_data);
  },
  role__view: async req => {
    return await viewHelper.entityView(
      req,
      require("../models/role")
    );
  },
  user__create: async req => {
    return await user.create(req.request_data);
  },
  user__delete: async req => {
    return await user.delete(req.request_data);
  },
  user__view: async req => {
    return await user.find(req.request_data);
  },
  token: async (username, password) => {
    try {
      let userObj = await user.findOne({
        user_name: username
      });

      if (userObj) {
        if (userObj.comparePassword(password)) {
          let token = jwt.sign(
            {
              User: {
                email: user.email,
                user_name: userObj.user_name,
                first_name: userObj.first_name,
                last_name: userObj.last_name,
                id: userObj._id,
                role_code: userObj.user_role
              },
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(
                Date.now() / 1000 +
                  Number.parseInt(process.env.TOKEN_TIME_EXPIRE_IN_SECOND)
              )
            },
            process.env.SECRET
          );

          let navigation = await appsettings.appsettings__view(
            userObj.user_role
          );

          return common.helper.respondMaker(
            "",
            {
              token: token,
              user_name: userObj.user_name,
              first_name: userObj.first_name,
              last_name: userObj.last_name,
              role_code: userObj.user_role,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(
                Date.now() / 1000 +
                  Number.parseInt(process.env.TOKEN_TIME_EXPIRE_IN_SECOND)
              ),
              accessible_entities: JSON.stringify(
               await navigation.AccessibleEntities
              ),
              accessible_operations: JSON.stringify(
               await navigation.AccessibleOperations
              ),
              admin_enities: JSON.stringify( await navigation.AdminEntities)
            },
            true
          );
        } else {
          throw common.helper.respondMaker(
            "user name or password are incorrect.",
            null,
            false
          );
        }
      } else {
        throw common.helper.respondMaker("user not found.", null, false);
      }
    } catch (e) {
      console.log(e);
      throw common.helper.respondMaker("user not found.", null, false);
    }
  }
};
