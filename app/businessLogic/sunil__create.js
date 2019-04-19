
      const helper = require('../common/helper');
      const bal = {};
    
      bal.sunil__create = async (req)=>
        {
            const sunil = require('../models/sunil');
            console.log('create');
            return await sunil.create(req.request_data);
        };
    module.exports = bal;
      