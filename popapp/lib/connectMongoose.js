const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
    console.log('Error de conexion', err);
});

mongoose.connection.once('open', () => {
    console.log('Conected to mongoDB in', mongoose.connection.name);
});
mongoose.connect('mongodb://localhost:27017/popapp');

module.exports = mongoose.connection;
