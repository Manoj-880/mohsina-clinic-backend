const patientRepo = require("../repos/patientRepo");
const followUpRepo = require("../repos/patientFollowupRepo");

const getDashboardData = async (req, res) => {
    try {
        const doctor = req.body.doctor;
        let patients = await patientRepo.getPatientByDoctor(doctor);
        let data = [];

        if (patients && patients.length > 0) {
            const date = new Date().toISOString().split('T')[0];

            const patientData = await Promise.all(
                patients.map(async (patient) => {
                    const followUp = await followUpRepo.getFollowupByPatientId(patient.patientId);

                    if (followUp && followUp.followUpDate === date) {
                        return {
                            patientId: patient.patientId,
                            name: patient.name,
                            age: patient.age,
                            gender: patient.gender,
                            dateOfCase: patient.dateOfCase,
                            lastVisites: followUp.lastVisitDate,
                            lastVisitDescription: followUp.followupNotes,
                            isNew: followUp.isFirstVisit,
                            mobileNumber: patient.mobileNumber,
                            nextVisit: followUp.followUpDate
                        };
                    }
                    return null;
                })
            );

            data = patientData.filter(item => item !== null);

            res.status(200).send({
                success: true,
                message: "patients fetched successfully",
                data: data
            });
        } else {
            res.status(404).send({
                success: false,
                message: "No patients found for this doctor",
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
    getDashboardData
};