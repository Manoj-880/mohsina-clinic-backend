const utils = require("./constants");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: utils.cloudinaryName,
    api_key: utils.cloudinaryKey,
    api_secret: utils.cloudinarySecret
})

module.exports = cloudinary;