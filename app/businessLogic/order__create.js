
      const helper = require('../common/helper');
      const bal = {};
    
      bal.order__create = async (req)=>
        {
            const order = require('../models/order');
            console.log('create');
            return await order.create(req.request_data);
            //test and go man!!!
        };
    module.exports = bal;
      