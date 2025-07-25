const doctorModel = require("../models/doctorsModel");

const getAllDoctors = async () => {
    const doctors = await doctorModel.find();
    return doctors;
}

const getDoctorById = async (id) => {
    const doctor = await doctorModel.findById(id);
    return doctor;
}

const getDoctorByEmail = async (email) => {
    const doctor = await doctorModel.findOne({ email: email });
    return doctor;
}

const createDoctor = async (doctorData) => {
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return newDoctor;
}

const updateDoctor = async (id, doctorData) => {
    const updateDoctor = await doctorModel.findByIdAndUpdate(id, doctorData, { new: true });
    return updateDoctor;
}

const deleteDoctor = async (id) => {
    const deletedDoctor = await doctorModel.findByIdAndDelete(id);
    return deletedDoctor;
}

module.exports = {
    getAllDoctors,
    getDoctorById,
    getDoctorByEmail,
    createDoctor,
    updateDoctor,
    deleteDoctor
};