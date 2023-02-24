var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator');
const Advertisement = require('../models/Advertise');

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {

    //filtros
    const filterByName = req.query.name;
    const filterBySell = req.query.sell;
    const filterByTag = req.query.tags;

    //paginacion
    const skip = req.query.skip;
    const limit = req.query.limit;

    const filter = {};

    if (filterByName) {
      filter.name = filterByName;
    }

    //si sell = true
    if (filterBySell) {
      filter.sell = filterBySell;
    }
    //en caso de que sell = false devuelve esos

    if (filterByTag) {
      filter.tags = filterByTag;
    }



    const advertisements = await Advertisement.list(filter, skip, limit);
    res.locals.advertisements = advertisements;

    res.render('index');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
