require("dotenv").config();

const PORT = process.env.PORT || 3001;
const mongoUrl = process.env.MONGODB_URL;

module.exports = { PORT, mongoUrl };