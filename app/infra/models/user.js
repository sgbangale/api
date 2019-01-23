const mongoose = require('mongoose');
const crypto = require('crypto');

let UserSchema = mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    user_role: {
        type: String
    },
    user_active: {
        type: Boolean
    },
    salt :{type: String}
});

UserSchema.pre('save', function (next) {  
    this.salt = crypto.randomBytes(16).toString('hex');
    // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest 
    let hash = crypto.pbkdf2Sync(this.password, this.salt,1000, 64, `sha512`).toString(`hex`); 
    this.password = hash;
    next();
});

UserSchema.methods.comparePassword = function (attemptedPassword) {
    var hash = crypto.pbkdf2Sync(attemptedPassword,this.salt, 1000, 64, `sha512`).toString(`hex`); 
        return this.password === hash; 
};

mongoose.model('user', UserSchema);
module.exports = mongoose.model('user');