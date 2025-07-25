const { get } = require("mongoose");
const patientModel = require("../models/patientModel");

const getAllPatients = () => {
    return patientModel.find({});
};

const getPatientById = (id) => {
    return patientModel.find({ patientId: id });
};

const getPatientByMobileNumber = (mobileNumber) => {
    return patientModel.findOne({ mobileNumber: mobileNumber });
};

const getPatientByDoctor = (doctor) => {
    return patientModel.find({ doctor: doctor });
}

const addPatient = (patientData) => {
    const newPatient = new patientModel(patientData);
    return newPatient.save();
};

const updatePatient = (id, patientData) => {
    return patientModel.findOneAndUpdate({ patientId: id }, patientData, { new: true });
};

const deletePatient = (id) => {
    return patientModel.findOneAndDelete({ patientId: id });
};

module.exports = {
    getAllPatients,
    getPatientById,
    getPatientByMobileNumber,
    getPatientByDoctor,
    addPatient,
    updatePatient,
    deletePatient
};