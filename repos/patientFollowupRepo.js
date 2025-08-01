const patientFollowupModel = require('../models/patientFollowupModel');

const getAllFollowups = async () => {
    try {
        const followups = await patientFollowupModel.aggregate([
        {
            $sort: { followUpDate: -1 } // Ensure dates are sorted in each group
        },
        {
            $group: {
            _id: "$patientId",
            followups: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
            patientId: "$_id",
            followups: 1,
            _id: 0
            }
        }
        ]);

        return followups;
    } catch (error) {
        throw error;
    }
};


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

const getFollowupbiId = async(id) => {
    try {
        return await patientFollowupModel.findById(id);
    } catch (error) {
        throw error;
    }
}

const getFollowupByPatientId = async (patientId) => {
    try {
        const followups = await patientFollowupModel.find({ patientId: patientId });
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

const updateFollowup = async (id, followupData) => {
    try {
        const updatedFollowup = await patientFollowupModel.findByIdAndUpdate(id, followupData, { new: true, runValidators: true });
        if (!updatedFollowup) {
            throw new Error('Followup not found');
        }
        return updatedFollowup;
    } catch (error) {
        throw error;
    }
};

const deleteAllFollowupsByPatientId = async (patientId) => {
    try {
        await patientFollowupModel.deleteMany({ patientId: patientId });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllFollowups,
    getAllFollowupsByPatientId,
    getFollowupByPatientId,
    getFollowupbiId,
    getLatestFollowupByPatientId,
    createFollowup,
    updateFollowup,
    deleteAllFollowupsByPatientId,
};