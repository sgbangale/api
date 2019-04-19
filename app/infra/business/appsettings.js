const viewHelper = require("../../common/helper"),
  _ = require("lodash");
module.exports = {
  appsettings__view: async user_role => {
    let returnData = {
      AccessibleEntities: [],
      AccessibleOperations: [],
      AdminEntities: []
    };

    let reqSetting = {
      request_initiator_role_code: user_role,
      request_data: {
        filters: {
          entity_access_active: true,
          entity_access_build: true
        },
        sortFields: "entity_code",
        removeColumns:
          "-entity_access_js -__v -entity_access_active -_id -entity_access_build ",
        first: 0,
        rows: 0
      }
    };


    const roleObj = await require("../../infra/models/role").findOne({
      role_code: user_role
    });
    
    if (user_role !== "admin") {
      reqSetting.request_data.filters.entity_access_code = {
        '$in':await roleObj.role_entity_access
      };
    }
    
    let entityOperations = await viewHelper.entityView(
      reqSetting,
      require("../models/entityAccess")
    );

     _.forEach(await entityOperations.data, function(value) {
      if (value.entity_access_code.indexOf("__view") != -1) {
        if (user_role === "admin") {
          if (value.admin_entity_access) {
            returnData.AdminEntities.push({
              entity_access_code: value.entity_access_code,
              entity_code: value.entity_code,
              entity_schema_access: value.entity_schema_access,
              label: value.label
            });
          } else {
            returnData.AccessibleEntities.push({
              entity_access_code: value.entity_access_code,
              entity_code: value.entity_code,
              entity_schema_access: value.entity_schema_access,
              label: value.label
            });
          }
        } else {
          if (!value.admin_entity_access) {
            returnData.AccessibleEntities.push({
              entity_access_code: value.entity_access_code,
              entity_code: value.entity_code,
              entity_schema_access: value.entity_schema_access,
              label: value.label
            });
          }
        }
      }
    });

    let withoutEntity_viewAccessData = _.filter(
      await entityOperations.data,
      x => x.entity_access_code.indexOf("__view") == -1
    );
    returnData.AccessibleOperations =_.groupBy(
      withoutEntity_viewAccessData,
      "entity_code"
    );

    return await returnData;
  }
};
