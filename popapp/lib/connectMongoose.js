const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
    console.log('Error de conexion', err);
});

mongoose.connection.once('open', () => {
    console.log('Conectado a mongoDB en ', mongoose.connection.name);
});
// TODO: PRUEBAS cambia localhost por 127.0.0.1
mongoose.connect('mongodb://localhost:27017/popapp');

module.exports = mongoose.connection;
