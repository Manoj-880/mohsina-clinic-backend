const documentModel = require('../models/documentModel');

const getAllDocuments = async () => {
    return documentModel.find();
}

const getDocumentById = async (id) => {
    return documentModel.findById(id);
};

const addDocument = async (documentData) => {
    const document = new documentModel(documentData);
    return document.save();
};

const deleteDocument = async (id) => {
    return documentModel.findByIdAndDelete(id);
};

module.exports = {
    getAllDocuments,
    getDocumentById,
    addDocument,
    deleteDocument
};