const mongoose = require('mongoose');
mongoose.model('view', mongoose.Schema({
    view_code: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    can_view: {
        type: [mongoose.Schema.Types.Mixed]
    },
    can_edit: {
        type: [mongoose.Schema.Types.Mixed]
    }
}));
module.exports = mongoose.model('view');