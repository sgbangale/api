const dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routeConfig = require('./routeConfig');




const port =process.env.PORT || 8080;
const ip   =  process.env.DOMAIN ||  "0.0.0.0";
mongoose.connect(process.env.MONGOCS);

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan(process.env.ENVNAME));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token");
    next();
  });

app.use('/token',(req,res)=>{

});
// router goes here 
routeConfig.forEach((route)=>{
    app.use('/'+route.route,route.routeObj);
});

app.get('/', function (req, res) {
    res.send('hellow worldxx');
});

app.listen(port, ip,function(){
    console.log('env:');
    console.log(process.env.ENVNAME);
    console.log('Server running (***) on http://%s:%s', ip, port);
});
