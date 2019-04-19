
      const helper = require('../common/helper');
      const bal = {};
    
      bal.order__view = async (req)=>
        {
            return await helper.entityView(req.request_data,require('../models/order'));
        };
    module.exports = bal;
      