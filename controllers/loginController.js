const doctorRepo = require("../repos/doctorsRepo");
const utils = require("../utilities/constants");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await doctorRepo.getDoctorByEmail(email);
        if (doctor && doctor.password === password) {
            let secretKey = utils.secretKey;
            let data = {
                secretKey: secretKey,
                ...doctor._doc,
            }
            res.status(200).send({
                success: true,
                message: "Login successful",
                data: data
            });
        } else {
            res.status(200).send({
                success: false,
                message: "Invalid email or password",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = {
    login,
};