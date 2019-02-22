const helper = require('../common/helper');
const bal = {};

          bal.order__create = async (req)=>
        {
            const order = require('../models/order');
            console.log('create');
            return await order.create(req.request_data);
        };  bal.order__delete = async (req)=>
        {
            const order = require('../models/order');            
            return await order.delete(req.request_data);
        };  bal.order__view = async (req)=>
        {
            //console.log(require('../models/order').schema.obj);
            return await helper.entityView(req.request_data,require('../models/order'));
        };  bal.order_markinactive = async (req)=>
            {
                console.log('order_markinactive');
                return await req;
            };  bal.order_markactive = async (req)=>
            {
                console.log('order_markactive');
                return await req;
            };
        
          bal.product__create = async (req)=>
        {
            const product = require('../models/product');
            console.log('create');
            return await product.create(req.request_data);
        };  bal.product__delete = async (req)=>
        {
            const product = require('../models/product');
            console.log('delete');
            return await product.delete(req.request_data);
        };  bal.product__view = async (req)=>
        {
            return await helper.entityView(req.request_data,require('../models/product'));
        };  bal.product__markactive = async (req)=>
            {
                console.log('product__markactive');
                return await req;
            };
        module.exports = bal;