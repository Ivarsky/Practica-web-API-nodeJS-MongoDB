'use strict';

const Advertisement = require('../models/Advertise');
const connection = require('../lib/connectMongoose');

main().catch(err => console.log('Hubo un error', err));

async function main() {

    //inicializamos coleccion de anuncios
    await initAdvertisements();
    connection.close();

}

async function initAdvertisements() {
    //se borra todo de la coleccion de anuncions
    const deleted = await Advertisement.deleteMany();
    console.log(`Deleted ${deleted.deletedCount} advertisement`);

    //crea anuncios iniciales
    const inserted = await Advertisement.insertMany([
        {
            name: 'bicicleta',
            sell: true,
            price: 150,
            photo: 'bici.jpg',
            tags: ['lifestyle', 'motor']
        },
        {
            name: 'iphone3gs',
            sell: false,
            price: 50,
            photo: 'iphone.jpg',
            tags: ['lifestyle', 'mobile']
        },
        {
            name: 'plumbus',
            sell: true,
            price: 415,
            photo: 'plumbus.jpg',
            tags: ['lifestyle']
        },
        {
            name: 'mr.meeseeks box',
            sell: false,
            price: 1000,
            photo: 'mr.meeseeks.jpg',
            tags: ['lifestyle']
        },
        {
            name: 'space ship',
            sell: true,
            price: 350000,
            photo: 'spaceship.jpg',
            tags: ['motor']
        },
    ]);
    console.log(`Created ${inserted.length} advertisements`);
}
