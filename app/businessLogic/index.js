const bal = require('./bal');
const entityBal = require('../infra/business/entitybal'),
userAuth = require('../infra/business/authentication');
module.exports = {
    ...bal,
    ...entityBal,
    ...userAuth,
    getPath :()=>{
        return __dirname;
    }
}