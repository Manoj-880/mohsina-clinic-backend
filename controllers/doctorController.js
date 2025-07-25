const doctorRepo = require("../repos/doctorsRepo");

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorRepo.getAllDoctors();
        if(doctors){
            res.status(200).send({
                success: true,
                message: "Doctors fetched successfully",
                data: doctors
            });
        } else {
            res.status(404).send({
                success: false,
                message: "No doctors found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await doctorRepo.getDoctorById(id);
        if(doctor){
            res.status(200).send({
                success: true,
                message: "Doctor fetched successfully",
                data: doctor
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

const createDoctor = async (req, res) => {
    const doctorData = req.body;
    try {
        const newDoctor = await doctorRepo.createDoctor(doctorData);
        res.status(201).send({
            success: true,
            message: "Doctor created successfully",
            data: newDoctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const doctorData = req.body;
    try {
        const updatedDoctor = await doctorRepo.updateDoctor(id, doctorData);
        if(updatedDoctor){
            res.status(200).send({
                success: true,
                message: "Doctor updated successfully",
                data: updatedDoctor
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

const updateDoctorPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const updatedDoctor = await doctorRepo.updateDoctor(id, { password });
        if(updatedDoctor){
            res.status(200).send({
                success: true,
                message: "Your password updated successfully",
                data: updatedDoctor
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDoctor = await doctorRepo.deleteDoctor(id);
        if(deletedDoctor){
            res.status(200).send({
                success: true,
                message: "Doctor deleted successfully",
                data: deletedDoctor
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    updateDoctorPassword,
    deleteDoctor
};