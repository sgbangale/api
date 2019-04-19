
      const helper = require('../common/helper');
      const bal = {};
    
      bal.product__create = async (req)=>
        {
            const product = require('../models/product');
            console.log('create');
            return await product.create(req.request_data);
        };
    module.exports = bal;
      