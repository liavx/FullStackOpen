require("dotenv").config();

const PORT = process.env.PORT || 3001;

const mongoUrl = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL


module.exports = { PORT, mongoUrl };