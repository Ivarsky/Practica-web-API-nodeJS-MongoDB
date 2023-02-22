const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/Advertise');

//GET /api/advertisements
router.get('/', async (req, res, next) => {
    try {

        const advertisements = await Advertisement.find();
        res.json({ results: advertisements });

    } catch (error) {
        next(error)
    }

})


module.exports = router;