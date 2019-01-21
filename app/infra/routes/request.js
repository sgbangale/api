const express = require('express'),
common = require('../../common'),
bal = require('../business/requestbal')

const router = express.Router();
router.post('/', async (req, res) =>{
    let response =  await bal.createRequest(common.helper.requestParser(req));
    res.send(response);
});

router.get('/',async (req,res)=>{
    try{
    let result = await bal.viewRequest(common.helper.requestParser(req));
    res.send(result);
    }
    catch(exception) {
        res.send('error occuerred');
    }
});

module.exports = router;