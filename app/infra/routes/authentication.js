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
        return res.status(200).send({
            success: false,
            message: e
        });
    }
});
module.exports = router;