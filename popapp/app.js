var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { appendFileSync } = require("fs");
const LoginController = require("./controllers/loginController");
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");
const i18n = require("./lib/i18nConfigure");

require("./lib/connectMongoose");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.title = "PopApp";

app.use(i18n.init);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const loginController = new LoginController();

/**
 * Rutas del API
 */
app.use(
  "/api/advertisements",
  jwtAuthMiddleware,
  require("./routes/api/advertisements")
);
app.post("/api/authenticate", loginController.postAPI);

/**
 * Rutas del Website
 */
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // comprobar si es un error de validacion
  if (err.array) {
    //const errorInfo = err.array({ onlyFirstError: true })[0];
    const errorInfo = err.errors[0];
    console.log(errorInfo);
    err.message = `Error en ${errorInfo.location} parametro ${errorInfo.param} ${errorInfo.msg} `;
    err.status = 422;
  }
  res.status(err.status || 500);

  /**
   * Errores de peticiones al API devueltos en JSON
   */
  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
