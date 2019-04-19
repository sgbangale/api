const mongoose = require('mongoose');
mongoose.model('entityAccess', mongoose.Schema({
    entity_code: {
        type: String,        
        lowercase: true,
        trim: true
    },
    entity_access_code: {
        type: String,
        trim: true,
        unique: true,
    },
    entity_access_js: {
        type: String
    },
    entity_access_active: {
        type: Boolean
    },
    entity_schema_access:{
        type : [String]
    },
    entity_access_build: {
        type: Boolean
    },
    admin_entity_access: {
        type: Boolean
    },
    label:{
        type: String
    }
}));
module.exports = mongoose.model('entityAccess');