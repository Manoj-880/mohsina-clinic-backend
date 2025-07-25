const doctorController = require("../controllers/doctorController");
const express = require("express");
const router = express.Router();

router.get("/", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorById);
router.post("/", doctorController.createDoctor);
router.put("/:id", doctorController.updateDoctor);
router.patch("/password/:id", doctorController.updateDoctorPassword);
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;
