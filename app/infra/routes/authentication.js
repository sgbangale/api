const express = require('express'),
bal = require('../business/authentication')

const router = express.Router();
router.post('/', async (req, res) =>{
    try{
    let response =  await bal.token(req.body.user_name,req.body.password);
    res.send(response);
    }
    catch(e)
    {
       
        return res.send(e);
        
    }
});
module.exports = router;