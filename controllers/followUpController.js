const followUpRepo = require("../repos/patientFollowupRepo");
const healthrecordRepo = require("../repos//healthRecordsRepo");

const getAllFollowupsByPatientId = async (req, res) => {
    try {
        let patientId = req.params.id;
        let followups = await followUpRepo.getAllFollowupsByPatientId(patientId);
        if(followups) {
            res.status(200).send({
                success: true,
                message: "Follow-ups fetched successfully",
                data: followups
            });
        } else {
            res.status(404).send({
                success: false,
                message: "No follow-ups found",
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

const createFollowup = async (req, res) => {
    try {
        let followupData = req.body;
        let lastVisitDate = await followUpRepo.getLatestFollowupByPatientId(followupData.patientId);
        console.log(lastVisitDate.followUpDate);
        let data = {
            patientId: followupData.patientId,
            lastVisitDate: lastVisitDate.followUpDate,
            followUpDate: followupData.followUpDate,
            followupNotes: " ",
            isFirstVisit: lastVisitDate ? false : true
        }
        let newFollowup = await followUpRepo.createFollowup(data);
        res.status(201).send({
            success: true,
            message: "Follow-up created successfully",
            data: newFollowup
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    }
};

const updateFollowup = async (req, res) => {
    try {
        let patientId = req.params.id;
        let followupData = req.body;
        let updatedFollowup = await followUpRepo.updateFollowup(patientId, followupData);
        let healthData = await healthrecordRepo.updateHealthRecord(patientId, {prescription: followupData.followupNotes});
        if(updatedFollowup) {
            res.status(200).send({
                success: true,
                message: "Follow-up updated successfully",
                data: updatedFollowup
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Follow-up not found",
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
    getAllFollowupsByPatientId,
    createFollowup,
    updateFollowup
};