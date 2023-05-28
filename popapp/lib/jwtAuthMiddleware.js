const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// módulo que exporta un middleware
module.exports = async (req, res, next) => {
  try {
    // recogida de jwt de la cabecera, del body, o la query-string
    const jwtToken = req.get("Authorization") || req.body.jwt || req.query.jwt;

    // comprobación existencia de jwtToken
    if (!jwtToken) {
      const error = createError(401, "no token provided");
      next(error);
      return;
    }

    //comprobacion de validez del jwtToken
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.loggedUserAPI = payload._id;

    next();
  } catch (err) {
    //validez del token
    if (err.message === "invalid token") {
      next(createError(401, "invalid token"));
    }

    //expiración del token
    if (err.message === "jwt expired") {
      next(createError(401, "jwt expired"));
    }

    next(err);
  }
};
