const mongoose = require('mongoose');

//definir esquema de anuncios
const advertiseSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

//metodo estatico para recibir una lista con posibilidad de paginacion y filtrado
advertiseSchema.statics.list = function (filter, skip, limit, sort, fields) {
    const query = Advertisement.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);

    return query.exec();
}

//crear el modelo de anuncio
const Advertisement = mongoose.model('Anuncio', advertiseSchema);

//exportar el modelo
module.exports = Advertisement;
