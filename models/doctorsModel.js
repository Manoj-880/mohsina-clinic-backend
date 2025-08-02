const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// license no
// degree

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    licenseNo: {
        type: String,
    },
    degree: {
        type: String,
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);