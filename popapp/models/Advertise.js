const mongoose = require('mongoose');

//definir esquema de anuncios
const advertiseSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

//crear el modelo de anuncio
const Advertisement = mongoose.model('Anuncio', advertiseSchema);

//exportar el modelo
module.exports = Advertisement;
