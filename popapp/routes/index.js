var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator');
const Advertisement = require('../models/Advertise');

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {


    const advertisements = await Advertisement.find();
    res.locals.advertisements = advertisements;
    console.log(advertisements);

    res.render('index');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
