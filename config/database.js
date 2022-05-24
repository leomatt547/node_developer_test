const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Terhubung ke database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Sukses terhubung ke database");
    })
    .catch((error) => {
      console.log("Koneksi database gagal...");
      console.error(error);
      process.exit(1);
    });
};