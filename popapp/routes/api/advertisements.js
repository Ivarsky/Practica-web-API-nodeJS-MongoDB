const express = require('express');
const { create } = require('../../models/Advertise');
const router = express.Router();
const Advertisement = require('../../models/Advertise');

//GET /api/advertisements
//devuelve lista de anuncios
router.get('/', async (req, res, next) => {
    try {

        const advertisements = await Advertisement.find();
        //throw new Error('se ha roto');
        res.json({ results: advertisements });

    } catch (error) {
        next(error)
    }

})

//GET /api/advertisements/(_id)
//devuelve un anuncio buscando por _id
router.get('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;

        const advertisement = await Advertisement.findById(id);


        res.json({ result: advertisement });

    } catch (error) {
        next(error);
    }
});

//PUT /api/advertisements:(id) ()
//Actualizamos anuncio


router.put('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;
        const data = req.body;

        const updatedAdvertise = await Advertisement.findByIdAndUpdate(id, data, { new: true });

        res.json({ result: updatedAdvertise });

    } catch (error) {
        next(error)
    }
})



module.exports = router;