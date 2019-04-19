
        const mongoose = require('mongoose');
        mongoose.model('order', mongoose.Schema({"order_code":{"type":String},"order_name":{"type":String},"order_date":{"type":Date},"markactive":{"type":Boolean}}));
        module.exports = mongoose.model('order');