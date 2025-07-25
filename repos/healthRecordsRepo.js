const healthRecordsModel = require('../models/healthRecordModel');

const getHealthRecords = async (patientId) => {
    try {
        const records = await healthRecordsModel.find({ patientId: patientId });
        return records;
    } catch (error) {
        throw new Error(`Error fetching health records for patient ID ${patientId}: ${error.message}`);
    }
}

const addHealthRecord = async (recordData) => {
    try {
        const newRecord = new healthRecordsModel(recordData);
        await newRecord.save();
        return newRecord;
    } catch (error) {
        throw new Error(`Error adding health record: ${error.message}`);
    }
}

const updateHealthRecord = async (patientId, data) => {
    try {
        const updatedRecord = await healthRecordsModel.findOneAndUpdate(
            { patientId: patientId },
            data,
            { new: true }
        );
        return updatedRecord;
    } catch (error) {
        throw new Error(`Error updating health record for patient ID ${patientId}: ${error.message}`);
    }
}

const deleteHealthRecord = async (patientId) => {
    try {
        const deletedRecord = await healthRecordsModel.findOneAndDelete({ patientId: patientId });
        return deletedRecord;
    } catch (error) {
        throw new Error(`Error deleting health record for patient ID ${patientId}: ${error.message}`);
    }
};

module.exports = {
    getHealthRecords,
    addHealthRecord,
    updateHealthRecord,
    deleteHealthRecord
};