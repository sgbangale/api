const entityBal = require('../infra/business/entitybal'),
userAuth = require('../infra/business/authentication'),
appsettings = require('../infra/business/appsettings');
module.exports = {
    getPath :()=>{
        return __dirname;
    },    
    ...entityBal,
    ...userAuth,    
     ...appsettings,...require('./order__create'),...require('./order__delete'),...require('./order__view'),...require('./order__markactive'),...require('./order__markactive'),...require('./order__matst'),...require('./order__matst'),...require('./product__view'),...require('./product__view'),...require('./product__create'),...require('./order__markactive'),...require('./sunil__view'),...require('./order__create'),...require('./sunil__create'),}
    