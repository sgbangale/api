const express = require('express'),
common = require('../../common'),
bal = require('../business/requestbal'),
middlewares = require('../../common/middlewares');

const router = express.Router();
router.post('/',
middlewares.auth(), 
async (req, res) =>{
    let response =  await bal.createRequest(common.helper.requestParser(req));
    res.send(response);
});

router.get('/',
middlewares.auth(), 
async (req,res)=>{
    try{
    let result = await bal.viewRequest(common.helper.requestGetByIdParser(req));
    res.send(result);
    }
    catch(exception) {
        return res.send(common.helper.respondMaker('error occurred while processing your request',
        e
        ,false));
    }
});

module.exports = router;