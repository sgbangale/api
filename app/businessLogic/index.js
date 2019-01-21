const bal = require('./bal');
const entityBal = require('../infra/business/entitybal')

module.exports = {
    ...bal,
    ...entityBal,
    getPath :()=>{
        return __dirname;
    }
}