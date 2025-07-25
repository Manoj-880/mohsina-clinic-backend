const patientController = require("../controllers/patientController");
const express = require("express");
const router = express.Router();

router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getPatientById);
router.get("/mobile/:mobileNumber", patientController.getPatientByMobileNumber);
router.post("/", patientController.addPatient);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

module.exports = router;