
        const mongoose = require('mongoose');
        mongoose.model('order', mongoose.Schema({"order_name":{"type":String},"quantity":{"type":Number},"deliveryDate":{"type":Date}}));
        module.exports = mongoose.model('order');