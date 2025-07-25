const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientFollowupSchema = new Schema({
    patientId: {
        type: String,
        required: true,
    },
    lastVisitDate: {
        type: String,
        required: true,
    },
    followUpDate: {
        type: String,
        required: true,
    },
    followupNotes: {
        type: String,
        required: true,
    },
    isFirstVisit: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('PatientFollowup', patientFollowupSchema);