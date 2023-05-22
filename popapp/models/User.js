// Conexión
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Creación de esquema
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

//hasheado de pass
userSchema.statics.hashPassword = function (plaintextPassword) {
  return bcrypt.hash(plaintextPassword, 7);
};

//comprobación de pass
userSchema.methods.comparePassword = function (plaintextPassword) {
  return bcrypt.compare(plaintextPassword, this.password);
};

// Creación de modelo
const User = mongoose.model("User", userSchema);

// exportar
module.exports = User;
