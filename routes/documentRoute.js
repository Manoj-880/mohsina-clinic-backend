const documentController = require("../controllers/documentController");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Keep original name or add timestamp if needed
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


router.get("/", documentController.getAllDocuments);
router.post("/", upload.single("document"), documentController.addDocument);
router.delete("/:id", documentController.deleteDocument);

module.exports = router;