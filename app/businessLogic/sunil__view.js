const helper = require('../common/helper');
module.exports = {
    sunil__view : async (req) => {
        return await helper.entityView(req, require('../models/sunil'));
        //return await require('../models/sunil').count();
    }
};