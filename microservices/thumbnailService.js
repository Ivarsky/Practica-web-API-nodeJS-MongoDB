"use strict";

const { Responder } = require("cote");
const Jimp = require("jimp");

const responder = new Responder({ name: "thumbnail-service", port: 8000 });

responder.on("create-thumbnail", async (req, done) => {
  try {
    const { originalImagePath, thumbnailSize } = req;
    const image = await Jimp.read(originalImagePath);
    image.resize(thumbnailSize, Jimp.AUTO);
    const thumbnailPath = originalImagePath.replace(".jpg", "-thumbnail.jpg");
    await image.writeAsync(thumbnailPath);
    console.log("thumbnail creado: ", thumbnailPath);

    done(thumbnailPath);
  } catch (err) {
    console.error("Error al crear el thumbnail: ", err);
    done(err);
  }
});
