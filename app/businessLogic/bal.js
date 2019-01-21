const bal={};
 
          bal.order__create = async (req)=>
        {
            const order = require('../models/order');
            console.log('create');
            return await order.create(req.request_data);
        };  bal.order__delete = async (req)=>
        {
            const order = require('../models/order');
            console.log('delete');
            return await order.delete(req.request_data);
        };  bal.order__view = async (req)=>
        {
            const order = require('../models/order');
            console.log('view');
            return await order.find(req.request_data);
        };  bal.order_markinactive = async (req)=>
            {
                console.log('order_markinactive');
                return await req;
            };  bal.order_markactive = async (req)=>
            {
                console.log('order_markactive');
                return await req;
            };
        
          bal.order__create = async (req)=>
        {
            const order = require('../models/order');
            console.log('create');
            return await order.create(req.request_data);
        };  bal.order__delete = async (req)=>
        {
            const order = require('../models/order');
            console.log('delete');
            return await order.delete(req.request_data);
        };  bal.order__view = async (req)=>
        {
            const order = require('../models/order');
            console.log('view');
            return await order.find(req.request_data);
        };  bal.order_markinactive = async (req)=>
            {
                console.log('order_markinactive');
                return await req;
            };  bal.order_markactive = async (req)=>
            {
                console.log('order_markactive');
                return await req;
            };
        module.exports = bal;
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

