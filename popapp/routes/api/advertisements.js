const express = require("express");
const { create } = require("../../models/Advertise");
const router = express.Router();
const Advertisement = require("../../models/Advertise");
const upload = require("../../lib/uploadConfigure");
const { body, validationResult } = require("express-validator");
const { Requester } = require("cote");

const requester = new Requester({ name: "thumbnail-requester" });

//GET /api/advertisements
//devuelve lista de anuncios
router.get("/", async (req, res, next) => {
  try {
    //filtros
    const filterByName = req.query.name;
    const filterBySell = req.query.sell;
    const filterByTag = req.query.tags;
    const filterByPrice = req.query.price;

    //paginacion
    const skip = req.query.skip;
    const limit = req.query.limit;

    //sort
    const sort = req.query.sort;

    // seleccion de campos
    const fields = req.query.fields;

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

    if (filterByPrice) {
      filter.price = filterByPrice;
    }

    const advertisements = await Advertisement.list(
      filter,
      skip,
      limit,
      sort,
      fields
    );
    res.json({ results: advertisements });
  } catch (error) {
    next(error);
  }
});

//GET api/advertisements/tags
//Devuelve una lista de tags permitidos
router.get("/tags", (req, res, next) => {
  res.json({ results: ["lifestyle", "motor", "mobile", "work"] });
});

//GET /api/advertisements/(_id)
//devuelve un anuncio buscando por _id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const advertisement = await Advertisement.findById(id);

    res.json({ result: advertisement });
  } catch (error) {
    next(error);
  }
});

//PUT /api/advertisements:(id) (body)
//Actualizamos anuncio

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedAdvertise = await Advertisement.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({ result: updatedAdvertise });
  } catch (error) {
    next(error);
  }
});

//POST /api/advertisements (body)
//Crea un nuevo anuncio
router.post(
  "/",
  upload.single("photo"),
  body("tags")
    .isIn(["lifestyle", "motor", "mobile", "work"])
    .withMessage(
      "solo los tags lifestyle, motor, mobile y work son permitidos"
    ),
  async (req, res, next) => {
    try {
      validationResult(req).throw();

      const advertiseData = req.body;
      advertiseData.originalPhoto = req.file.filename;

      // evento para enviar petición de creación de thumbnail
      const event = {
        type: "create-thumbnail",
        originalImagePath: req.file.path,
        thumbnailSize: 100, // con 200 se visualiza mejor pero por requirimiento de la practica lo dejo a 100
      };

      // petición de creación de thumbnail
      const thumbnailPath = await new Promise((resolve) =>
        requester.send(event, resolve)
      );

      advertiseData.photo = advertiseData.originalPhoto.replace(
        ".jpg",
        "-thumbnail.jpg"
      );

      //creamos instancia de advertisement
      const advertisement = new Advertisement(advertiseData);

      //la persistimos en la DB
      const persistedAdvertise = await advertisement.save();

      console.log(persistedAdvertise);

      // mensaje con la ruta del filesystem a la imagen (requisito práctica)
      console.log("Ruta del filesystema al thumbnail: ", thumbnailPath);

      res.json({ result: persistedAdvertise });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE /api/advertisements/:(id)
//Borra un anuncio
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await Advertisement.deleteOne({ _id: id });

    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
