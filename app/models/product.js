
        const mongoose = require('mongoose');
        mongoose.model('product', mongoose.Schema({"product_name":{"type":String},"quantity":{"type":Number},"deliveryDate":{"type":Date}}));
        module.exports = mongoose.model('product');