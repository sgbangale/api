
      const helper = require('../common/helper');
      const bal = {};
    
      bal.order__delete = async (req)=>
        {
            const order = require('../models/order');
            console.log('delete');
            return await order.delete(req.request_data);
        };
    module.exports = bal;
      