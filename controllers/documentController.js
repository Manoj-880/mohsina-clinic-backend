const documentRepo = require("../repos/documentRepo");
const cloudinary = require("../utilities/cloudinary");

const getAllDocuments = async (req, res) => {
    try {
        const documents = await documentRepo.getAllDocuments();
        if(documents) {
            res.status(200).send({
                success: true,
                message: "Documents retrieved successfully",
                data: documents
            });
        } else {
            res.status(404).send({
                success: false,
                message: "No documents found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    };
};

const addDocument = async (req, res) => {
    try {
        const file = req.file;
        const { title } = req.body;

        if (!file || !title) {
            return res.status(400).send({
                success: false,
                message: "Title and file are required",
            });
        }

        const cloudinaryUrl = file.path;
        const cloudinaryPublicId = file.filename;

        const documentData = {
            title,
            cloudinaryUrl,
            cloudinaryPublicId,
            uploadedAt: new Date()
        };

        console.log(documentData);

        const addedDocument = await documentRepo.addDocument(documentData);

        if (addedDocument) {
            res.status(201).send({
                success: true,
                message: "Document added successfully",
                data: addedDocument
            });
        } else {
            res.status(400).send({
                success: false,
                message: "Failed to add document"
            });
        }
    } catch (error) {
        console.error("Error adding document:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const file = await documentRepo.getDocumentById(req.params.id);

        await cloudinary.uploader.destroy(file.cloudinaryPublicId, {resource_type: "raw"});
        await documentRepo.deleteDocument(req.params.id);

        res.status(200).send({
            success: true,
            message: "Document deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}


module.exports = {
    getAllDocuments,
    addDocument,
    deleteDocument
};