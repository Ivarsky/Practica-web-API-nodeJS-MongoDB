//cargamos el modelo de usuarios
const { User } = require("../models");
const jwt = require("jsonwebtoken");

class LoginController {
  async postAPI(req, res, next) {
    try {
      const { email, password } = req.body;

      //busqueda de usuario en BD
      const user = await User.findOne({ email: email });

      // si no existe o la pass no coincide --> error
      if (!user || !(await user.comparePassword(password))) {
        res.json({ error: "Credenciales invalidas" });
        return;
      }

      //si existe y la pass coincide
      //crea JWT con el _id del usuario dentro
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      res.json({ jwt: { token } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
