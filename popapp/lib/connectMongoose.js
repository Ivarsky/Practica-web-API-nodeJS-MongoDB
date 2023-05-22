const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connection.on("error", (err) => {
  console.log("Error de conexion", err);
});

mongoose.connection.once("open", () => {
  console.log("Conected to mongoDB in", mongoose.connection.name);
});
mongoose.connect(`${process.env.MONGODB_CONNECTION_STR}`);

module.exports = mongoose.connection;
