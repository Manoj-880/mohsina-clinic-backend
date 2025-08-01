const patientRepo = require("../repos/patientRepo");
const followUpRepo = require("../repos/patientFollowupRepo");

const getDashboardData = async (req, res) => {
    try {
        const doctor = req.body.doctor;
        const patients = await patientRepo.getPatientByDoctor(doctor);
        const data = [];
        const today = new Date().toISOString().split("T")[0];

        if (patients && patients.length > 0) {
            for (const patient of patients) {
                const followUps = await followUpRepo.getFollowupByPatientId(patient.patientId);

                for (const followup of followUps) {
                    if (followup && followup.followUpDate === today) {
                        console.log(`Today's date: ${today}, FollowUp date: ${followup.followUpDate}`);
                        data.push({
                            patientId: patient.patientId,
                            name: patient.name,
                            age: patient.age,
                            gender: patient.gender,
                            dateOfCase: patient.dateOfCase,
                            lastVisited: followup.lastVisitDate,
                            lastVisitDescription: followup.followupNotes,
                            isNew: followup.isFirstVisit,
                            mobileNumber: patient.mobileNumber,
                            nextVisit: followup.followUpDate
                        });
                    }
                }
            }

            return res.status(200).json({
                success: true,
                message: "Patients fetched successfully",
                data
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No patients found for this doctor",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


module.exports = {
    getDashboardData
};