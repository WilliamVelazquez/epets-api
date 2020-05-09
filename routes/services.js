const express = require('express');
const admin = require('firebase-admin');

let db = admin.firestore();

function servicesApi (app){
  const router = express.Router();
  app.use('/api/services', router);

  router.get('/ads', (req, res, next) => {
    let ref = `ads`
    db.collection(ref).get()
    .then((snapshot) => {
      let documentsId = {}
      console.log(`This are the documents in ads collection:`)
      snapshot.forEach((doc) => {
        documentsId[doc.id] = doc.data();
        console.log(doc.id, '->', doc.data());
      })
      res.status(200).json(documentsId);
    }) 
    .catch((err) => {
      console.log('Error getting documents in collection:', err);
      res.status(500).json({"error":"getting documents in collection"});
    })
  })

  router.get('/medic', (req, res, next) => {
    let ref = `med-service`
    db.collection(ref).get()
    .then((snapshot) => {
      let documentsId = {}
      console.log(`This are the documents in ads collection:`)
      snapshot.forEach((doc) => {
        documentsId[doc.id] = doc.data();
        console.log(doc.id, '->', doc.data());
      })
      res.status(200).json(documentsId);
    }) 
    .catch((err) => {
      console.log('Error getting documents in collection:', err);
      res.status(500).json({"error":"getting documents in collection"});
    })
  })
  
}

module.exports = servicesApi

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}