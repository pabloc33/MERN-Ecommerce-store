const mongoose = require("mongoose");

const connectDatbase = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(`mongodb is conected with server: ${data.connection.host}`);
  });
};

module.exports = connectDatbase;
