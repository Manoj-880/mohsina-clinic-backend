const documentRepo = require("../repos/documentRepo");
const fs = require("fs");
const path = require("path");

const getAllDocuments = async (req, res) => {
    try {
        const documents = await documentRepo.getAllDocuments();
        const fullHost = `${req.protocol}://${req.get('host')}`;

        const docsWithUrls = documents.map(doc => {
            const isCloudinaryUrl = doc.cloudinaryUrl.startsWith('http');

            return {
                ...doc._doc,
                fileUrl: isCloudinaryUrl
                    ? doc.cloudinaryUrl
                    : `${fullHost}/${doc.cloudinaryUrl}`
            };
        });

        res.status(200).send({
            success: true,
            message: "Documents retrieved successfully",
            data: docsWithUrls
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};


const addDocument = async (req, res) => {
    try {
        const file = req.file;
        const { title } = req.body;

        console.log(req.body);

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

        if (!file) {
            return res.status(404).send({
                success: false,
                message: "Document not found"
            });
        }

        // Construct full file path if it's a local file
        const filePath = path.join(__dirname, '../uploads', path.basename(file.cloudinaryUrl));

        // Delete the local file if it exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // or use fs.promises.unlink for async
        }

        // Delete the DB entry
        await documentRepo.deleteDocument(req.params.id);

        res.status(200).send({
            success: true,
            message: "Document deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};


module.exports = {
    getAllDocuments,
    addDocument,
    deleteDocument
};