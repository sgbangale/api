
        const mongoose = require('mongoose');
        mongoose.model('sunil', mongoose.Schema({"num":{"type":Number},"name":{"type":String}}));
        module.exports = mongoose.model('sunil');