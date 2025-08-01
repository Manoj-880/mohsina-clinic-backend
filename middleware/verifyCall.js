const utils = require("../utilities/constants");

const verifyCall = (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers.key;
    if (!authHeader) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized access, key is missing",
        });
    }
    if (authHeader !== utils.secretKey) {
        return res.status(403).send({
            success: false,
            message: "Forbidden access, invalid key",
        });
    }
    next();
}

module.exports = verifyCall;
