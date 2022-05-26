const app = require("./app");
const dotenv = require("dotenv");
const connectDatbase = require("./db/Database");
const cloudinary = require("cloudinary");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server Handling uncaught Exception`);
});

// config
dotenv.config({
  path: "backend/config/.env",
});

//connect databese
connectDatbase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on htpp://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shitting down server for ${err.message}`);
  console.log(`Shitting down the server due to Unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
