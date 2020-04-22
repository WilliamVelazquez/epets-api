const express = require('express');
const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
//const serviceAccount = require("./path/to/the/service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cohort1-teamdiego.firebaseio.com"
});

let db = admin.firestore();

db.collection('test').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '->', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });