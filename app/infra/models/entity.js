const mongoose = require('mongoose');
mongoose.model('entity', mongoose.Schema({
    entity_code: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    entity_name: {
        type: String,
        trim: true
    },
    entity_access: {
        type: [mongoose.Schema.Types.Mixed]
    },
    entity_active: {
        type: Boolean
    },
    entity_schema: {
        type:mongoose.Schema.Types.Mixed
    },
    entity_build:{
        type : Boolean
    }
}));
module.exports = mongoose.model('entity');