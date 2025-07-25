const patientFollowupModel = require('../models/patientFollowupModel');

const getAllFollowupsByPatientId = async (patientId) => {
    try {
        const followups = await patientFollowupModel
            .find({ patientId: patientId })
            .sort({ followUpDate: -1 }); // Sort by followUpDate descending
        return followups;
    } catch (error) {
        throw error;
    }
};


const getFollowupByPatientId = async (patientId) => {
    try {
        const followups = await patientFollowupModel.findOne({ patientId: patientId });
        return followups;
    } catch (error) {
        throw error;
    }
};

const getLatestFollowupByPatientId = async (patientId) => {
    try {
        const latestFollowup = await patientFollowupModel.findOne({ patientId })
            .sort({ followUpDate: -1 }); // Descending order
        return latestFollowup;
    } catch (error) {
        throw error;
    }
};


const createFollowup = async (followupData) => {
    try {
        const newFollowup = new patientFollowupModel(followupData);
        await newFollowup.save();
        return newFollowup;
    } catch (error) {
        throw error;
    }
};

const updateFollowup = async (patientId, followupData) => {
    try {
        const updatedFollowup = await patientFollowupModel.findOneAndUpdate(
            { patientId: patientId },
            followupData,
            { new: true, runValidators: true }
        );
        if (!updatedFollowup) {
            throw new Error('Followup not found');
        }
        return updatedFollowup;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllFollowupsByPatientId,
    getFollowupByPatientId,
    getLatestFollowupByPatientId,
    createFollowup,
    updateFollowup
};