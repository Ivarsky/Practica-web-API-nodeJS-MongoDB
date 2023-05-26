const multer = require("multer");
const path = require("node:path");

// Configuracion

const storage = multer.diskStorage({
  // ruta
  destination: function (req, file, cb) {
    const route = path.join(__dirname, "..", "public", "images", "anuncios");
    cb(null, route);
  },

  //filename
  filename: function (req, file, cb) {
    const filename =
      file.fieldname + "-" + Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

module.exports = multer({ storage });
