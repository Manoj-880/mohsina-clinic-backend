const express = require("express");
const router = express.Router();
const followUpController = require("../controllers/followUpController");

router.get("/", followUpController.getAllFollowups);
router.get("/:id", followUpController.getAllFollowupsByPatientId);
router.post("/", followUpController.createFollowup);
router.put("/:id", followUpController.updateFollowup);

module.exports = router;