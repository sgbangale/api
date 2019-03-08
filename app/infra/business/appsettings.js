const viewHelper = require('../../common/helper'),
_ = require('lodash');
module.exports = {
    appsettings__view : async (req)=>
        {  
            let returnData = {
                AccessibleEntities :[],
                AccessibleOperations :[]
            };
            let request_data ={
                entityAccess: {
                    filters:{
                        entity_access_active : true,
                      },
                    sortFields:'entity_code',
                    removeColumns:"-entity_access_js -__v -entity_access_active -_id",
                    first:0,
                    rows:0
                    }
                };
            let entityOperations = await viewHelper.entityView(request_data.entityAccess,require('../models/entityAccess'));
            
            _.forEach(entityOperations.data, function(value) {
                if(value.entity_access_code.indexOf('__view')!=-1)
                {
                    returnData.AccessibleEntities.push(value.entity_code);
                }
              });
            
              let withoutEntity_viewAccessData = _.filter(entityOperations.data,x=> x.entity_access_code.indexOf('__view') == -1);
              returnData.AccessibleOperations = _.groupBy(withoutEntity_viewAccessData,'entity_code');

              return returnData;

        }
};
