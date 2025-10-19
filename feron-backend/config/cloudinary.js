const cloudinary = require('cloudinary').v2;
const logger = require('../utils/logger');

function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });
    return true;
  }
  logger.warn('Cloudinary not configured. Falling back to local storage for uploads.');
  return false;
}

module.exports = { cloudinary, configureCloudinary };
