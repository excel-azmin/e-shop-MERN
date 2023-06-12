require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3002;
const MONGODB_ATLAS_URL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceDB";
const DEFAULT_IMAGE_PATH = process.env.DEFAULT_IMAGE_PATH || "public/images/defaultUser.png";
const JWT_ACTIVATION_KEY = process.env.JWT_ACTIVATION_KEY || "1234567890";
const SMTP_USERNAME = process.env.SMTP_USERNAME || "excel.azmin@gmail.com";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "excel.azmin@gmail.com";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

module.exports = { SERVER_PORT, MONGODB_ATLAS_URL, DEFAULT_IMAGE_PATH, JWT_ACTIVATION_KEY, SMTP_USERNAME, SMTP_PASSWORD, CLIENT_URL };