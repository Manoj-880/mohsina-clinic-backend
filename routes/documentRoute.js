const documentController = require("../controllers/documentController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../utilities/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'pdfs',
        resource_type: 'auto',
        format: async (req, file) => 'pdf',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({ storage: storage });

router.get("/", documentController.getAllDocuments);
router.post("/", upload.single("file"), documentController.addDocument);
router.delete("/:id", documentController.deleteDocument);

module.exports = router;