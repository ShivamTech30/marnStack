const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: "sam-images",
  api_key: "746836638841559",
  api_secret: "BunBAnV7yXGj8KB2DiHoXO9j1yA"
  });

module.exports = cloudinary;
