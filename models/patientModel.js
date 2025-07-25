const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientModel = new Schema({
    patientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfCase: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("patients", patientModel);