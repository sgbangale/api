const bal = require('./bal');
const entityBal = require('../entities/business')

module.exports = {
    ...bal,
    ...entityBal,
    getPath :()=>{
        return __dirname;
    }
}