// Conection
const mongoose = require("mongoose");

// Create schema
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

// Create model
const User = mongoose.model("User", userSchema);

// exporting
module.exports = User;
