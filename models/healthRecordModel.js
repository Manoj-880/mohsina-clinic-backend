const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthRecordSchema = new Schema({
    patientId: {
        type: String,
        required: true,
        ref: 'patients'
    },
    chiefComplaint: String,
    historyOfChiefComplaint: String,
    pastHistory: String,
    familyHistory: String,
    patientAsPerson: {
        appearance: {
            physicalBuilt: String,
            skin: String,
            hair: String,
            nail: String,
            face: String
        },
        digestion: {
            appetite: String,
            diet: String,
            diseases: String,
            cravings: String,
            aversions: String,
            thirst: String
        },
        elimination: {
            stool: String,
            perspiration: String,
            urine: String
        },
        menstrualHistory: {
            menarche: String,
            LMP: String,
            menopause: String,
            menses: {
                duration: String,
                cycle: String,
                flow: String,
                color: String,
                cloths: String,
                odour: String,
                stains: String
            },
            concomitance: {
                before: String,
                during: String,
                after: String
            },
            leucorrhea: String
        },
        sexualFunctions: String
    },
    lifeSpace: String,
    thermals: String,
    diagnosis: String,
    prescription: {
        type: String,
        default: "",
    }
}, { timestamps: true });

module.exports = mongoose.model('healthRecords', healthRecordSchema);
