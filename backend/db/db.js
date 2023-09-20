const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Conncted");
  } catch (error) {
    console.log("DB Connction Error");
  }
};
db();
module.exports = { db };
