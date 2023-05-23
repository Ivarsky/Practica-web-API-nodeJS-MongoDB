"use strict";

require("dotenv").config();

const { Advertisement, User } = require("../models");
const connection = require("../lib/connectMongoose");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  //inicializamos coleccion de anuncios
  await initAdvertisements();

  //inicializamos coleccion de ususarios
  await initUsers();

  connection.close();
}

async function initAdvertisements() {
  //se borra todo de la coleccion de anuncions
  const deleted = await Advertisement.deleteMany();
  console.log(`Deleted ${deleted.deletedCount} advertisement`);

  //crea anuncios iniciales
  const inserted = await Advertisement.insertMany([
    {
      name: "bicicleta",
      sell: true,
      price: 150,
      photo: "bici.jpg",
      tags: ["lifestyle", "motor"],
    },
    {
      name: "iphone3gs",
      sell: false,
      price: 50,
      photo: "iphone.jpg",
      tags: ["lifestyle", "mobile"],
    },
    {
      name: "Jerry Smith",
      sell: true,
      price: 5,
      photo: "jerry.jpg",
      tags: ["lifestyle"],
    },
    {
      name: "plumbus",
      sell: true,
      price: 415,
      photo: "plumbus.jpg",
      tags: ["lifestyle"],
    },
    {
      name: "mr.meeseeks box",
      sell: false,
      price: 1000,
      photo: "mr.meeseeks.jpg",
      tags: ["lifestyle"],
    },
    {
      name: "nave espacial",
      sell: true,
      price: 350000,
      photo: "spaceship.jpg",
      tags: ["motor"],
    },
    {
      name: "pistola de portales",
      sell: true,
      price: 6000000,
      photo: "portalpistol.jpg",
      tags: ["work"],
    },
  ]);
  console.log(`Created ${inserted.length} advertisements`);
}

async function initUsers() {
  // borrado de usuarios creados
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios`);

  // creación de usuarios iniciales
  const inserted = await User.insertMany([
    { email: "admin@example.com", password: await User.hashPassword("1234") },
    { email: "user@example.com", password: await User.hashPassword("1234") },
  ]);
  console.log(`Creados ${inserted.length} usuarios`);
}
