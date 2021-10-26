export default {
    URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/photo-gallery',
    USER: process.env.MONGO_DB_USER,
    PASSWORD: process.env.MONGO_DB_PASSWORD,
};
