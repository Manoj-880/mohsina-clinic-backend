const patientRepo = require("../repos/patientRepo");
const healthRepo = require("../repos/healthRecordsRepo");
const followUpRepo = require("../repos/patientFollowupRepo");

const getAllPatients = async (req, res) => {
    try {
        let patients = await patientRepo.getAllPatients();
        let data = [];
        if(patients) {
            for (const patient of patients) {
                const followup = await followUpRepo.getAllFollowupsByPatientId(patient.patientId); // ✅ Properly awaited
                const isNew = followup[0].isNew;
                data.push({
                    patientId: patient.patientId,
                    name: patient.name,
                    mobileNumber: patient.mobileNumber,
                    doctor: patient.doctor,
                    dateOfCase: patient.dateOfCase,
                    gender: patient.gender,
                    age: patient.age,
                    isNew: isNew,
                });
            }
            res.status(200).send({
                success: true,
                message: "Patients fetched successfully",
                data: data
            });
        } else {
            res.status(404).send({
                success: false,
                message: "No patients found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    };
};

const getPatientById = async (req, res) => {
    try {
        let id = req.params.id;
        let patient = await patientRepo.getPatientById(id);
        let healthRecord = await healthRepo.getHealthRecords(id);
        let patientFollowups = await followUpRepo.getAllFollowupsByPatientId(id);
        let followups = [];
        patientFollowups.forEach((followup) => {
            followups.push({
                _id: followup._id,
                followupDate: followup.followUpDate,
                followupNotes: followup.followupNotes,
            });
        });
        // console.log(patientFollowups);
        if(patient && healthRecord) {
            let data = {
                priliminaryDetails: patient,
                chiefComplaint: healthRecord[0].chiefComplaint,
                historyOfChiefComplaint: healthRecord[0].historyOfChiefComplaint,
                pastHistory: healthRecord[0].pastHistory,
                familyHistory: healthRecord[0].familyHistory,
                patientAsPerson: healthRecord[0].patientAsPerson,
                lifeSpace: healthRecord[0].lifeSpace,
                thermals: healthRecord[0].thermals,
                diagnosis: healthRecord[0].diagnosis,
                prescription: healthRecord[0].prescription,
                followUps: followups,
            }
            res.status(200).send({
                success: true,
                message: "Patient fetched successfully",
                data: data
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Patient not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    };
};

const getPatientByMobileNumber = async (req, res) => {
    try {
        let mobileNumber = req.params.mobileNumber;
        let patient = await patientRepo.getPatientByMobileNumber(mobileNumber);
        let healthRecord = await healthRepo.getHealthRecords(patient.patientId);
        if(patient && healthRecord) {
            let data = {
                priliminaryDetails: patient,
                chiefComplaint: healthRecord[0].chiefComplaint,
                historyOfChiefComplaint: healthRecord[0].historyOfChiefComplaint,
                pastHistory: healthRecord[0].pastHistory,
                familyHistory: healthRecord[0].familyHistory,
                patientAsPerson: healthRecord[0].patientAsPerson,
                lifeSpace: healthRecord[0].lifeSpace,
                thermals: healthRecord[0].thermals,
                diagnosis: healthRecord[0].diagnosis,
                prescription: healthRecord[0].prescription,
            }
            res.status(200).send({
                success: true,
                message: "Patient fetched ",
                data: data
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Patient not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    };
};

const addPatient = async (req, res) => {
    try {
        console.log(req.body)
        let patient = await patientRepo.getAllPatients();
        let count = patient.length;
        let year = new Date().getFullYear();
        let patientId = `P${year}00${count + 1}`;
        let data = {
            patientId: patientId,
            ...req.body.priliminaryDetails,
        }
        let newPatient = await patientRepo.addPatient(data);
        let healthData = {
            patientId: patientId,
            chiefComplaint: req.body.chiefComplaint,
            historyOfChiefComplaint: req.body.historyOfChiefComplaint,
            pastHistory: req.body.pastHistory,
            familyHistory: req.body.familyHistory,
            patientAsPerson: req.body.patientAsPerson,
            lifeSpace: req.body.lifeSpace,
            thermals: req.body.thermals,
            diagnosis: req.body.diagnosis,
        }
        let healthRecord = await healthRepo.addHealthRecord(healthData);
        let date = new Date();
        let followupData = {
            patientId: patientId,
            lastVisitDate: date.toISOString().split("T")[0],
            followUpDate: date.toISOString().split("T")[0],
            followupNotes: "",
            isFirstVisit: true,
        }
        // console.log(followupData);
        let followUp = await followUpRepo.createFollowup(followupData);
        if(newPatient && healthRecord && followUp) {
            res.status(201).send({
                success: true,
                message: "Patient added successfully",
                data: newPatient
            });
        } else {
            res.status(400).send({
                success: false,
                message: "Failed to add patient",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    }
}

const updatePatient = async (req, res) => {
    try {
        let patientId = req.params.id;
        let patientData = req.body.priliminaryDetails;
        let healthData = {
            chiefComplaint: req.body.chiefComplaint,
            historyOfChiefComplaint: req.body.historyOfChiefComplaint,
            pastHistory: req.body.pastHistory,
            familyHistory: req.body.familyHistory,
            patientAsPerson: req.body.patientAsPerson,
            lifeSpace: req.body.lifeSpace,
            thermals: req.body.thermals,
            diagnosis: req.body.diagnosis,
        }
        let healthRecord = await healthRepo.updateHealthRecord(patientId, healthData);
        let updatedData = await patientRepo.updatePatient(patientId, patientData);
        if(updatedData && healthRecord) {
            res.status(200).send({
                success: true,
                message: "Patient updated successfully",
                data: updatedData
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Patient not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    }
};

const deletePatient = async (req, res) => {
    try {
        let patientId = req.params.id;
        let deletedPatient = await patientRepo.deletePatient(patientId);
        let deletedHealthRecord = await healthRepo.deleteHealthRecord(patientId);
        let deletePatientFollowups = await followUpRepo.deleteAllFollowupsByPatientId(patientId);
        if(deletedPatient && deletedHealthRecord && deletePatientFollowups) {
            res.status(200).send({
                success: true,
                message: "Patient deleted successfully",
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Patient not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    getPatientByMobileNumber,
    addPatient,
    updatePatient,
    deletePatient
};