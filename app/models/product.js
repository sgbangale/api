
        const mongoose = require('mongoose');
        mongoose.model('product', mongoose.Schema({"Name":{"type":String},"Price":{"type":Number},"Quantity":{"type":Number}}));
        module.exports = mongoose.model('product');