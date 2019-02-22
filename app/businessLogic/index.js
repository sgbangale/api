const bal = require('./bal');
const entityBal = require('../infra/business/entitybal'),
userAuth = require('../infra/business/authentication'),
appsettings = require('../infra/business/appsettings');
module.exports = {
    ...bal,
    ...entityBal,
    ...userAuth,
    ...appsettings,
    getPath :()=>{
        return __dirname;
    }
}