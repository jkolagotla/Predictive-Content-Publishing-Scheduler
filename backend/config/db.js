const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/content_scheduler",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ MongoDB Connected Successfully");
    console.log("👤 Database User : jahnavi_k");
    console.log(`🌐 Cluster Host  : ${conn.connection.host}`);
    console.log(`📦 Database     : ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error");
    console.error(`📛 Message      : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
