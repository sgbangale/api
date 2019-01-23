const mongoose = require('mongoose');
mongoose.model('role', mongoose.Schema({
    role_code: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    role_name: {
        type: String
    },
    role_description: {
        type: String
    },   
    role_entity_access: {
        type: [mongoose.Schema.Types.Mixed]
    },
    role_active: {
        type: Boolean
    }
}));
module.exports = mongoose.model('role');