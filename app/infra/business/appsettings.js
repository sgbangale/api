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
                    rows:2000
                    }
                };
            let entityOperations = await viewHelper.entityView(request_data.entityAccess,require('../models/entityAccess'));
            
            _.forEach(entityOperations.data, function(value) {
                if(value.entity_access_code.indexOf('__view')!=-1)
                {
                    returnData.AccessibleEntities.push(value.entity_code);
                }
              });
            
              returnData.AccessibleOperations = _.groupBy(entityOperations.data,'entity_code');

              return returnData;

        }
};
