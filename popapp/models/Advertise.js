const mongoose = require('mongoose');

//definir esquema de anuncios
const advertiseSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

advertiseSchema.statics.list = function (filter) {
    const query = Advertisement.find(filter);

    return query.exec();
}

//crear el modelo de anuncio
const Advertisement = mongoose.model('Anuncio', advertiseSchema);

//exportar el modelo
module.exports = Advertisement;
