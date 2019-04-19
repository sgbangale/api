
      const helper = require('../common/helper');
      const bal = {};
    
      bal.product__view = async (req)=>
        {
            //this is demo to mogesh..
            
            return await helper.entityView(req.request_data,require('../models/product'));
        };
    module.exports = bal;
      