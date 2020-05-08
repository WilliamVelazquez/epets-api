const express = require('express');
const admin = require('firebase-admin');

const { serviceKey, serviceUrl } = require('../config');

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  databaseURL: serviceUrl
});

let db = admin.firestore();

function productsApi (app){
  const router = express.Router();
  app.use('/', router);

  router.post('/api/:product/:collection', (req, res, next) => {
    let ref = `${req.params.product}/pets/${req.params.collection}`;
    db.collection(ref).doc().create(req.body)
    .then((r) => {
      console.log(`Document created successfully`);
      res.status(201).json({"document":"created"});
    })
    .catch((err) => {
      console.log('Error creating document:', err);
      res.status(500).json({"error":"creating"});
    })
  })

  router.get('/api/:product',  (req, res, next) => {
    let ref = `${req.params.product}/pets`
    db.doc(ref).listCollections()
    .then( async (collections) => {
      let collectionList = []
      for(let collection of collections){
        collectionList.push(collection.id)   
      }
      let data = await getSubcollectionsData(collectionList);
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log('Error listing sub-collections:', err);
      res.status(500).json({"error":"listing sub-collections"});
    })

    async function getSubcollectionsData (list) { 
      let data = {}
      for(let pet of list){
        let secRef = `${ref}/${pet}`
        let productDocs = {}
        console.log('Documents in: ', pet);
        let snapshot = await db.collection(secRef).get()
        snapshot.forEach((doc) => {
          console.log(' ° ', doc.id,'  ->  ',doc.data());
          productDocs[doc.id] = doc.data();
          data[pet] = productDocs;
        })
      }
      return data;
    }
  })

  router.get('/api/:product/:collection', (req, res, next) => {
    let ref = `${req.params.product}/pets/${req.params.collection}`;
    db.collection(ref).get()
    .then((snapshot) => {
      let documentsId = {}
      console.log(`This are the documents in ${req.params.collection} collection:`)
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

  router.get('/api/:product/:collection/:id', (req, res, next) => {
    let ref = `${req.params.product}/pets/${req.params.collection}/${req.params.id}`;
    db.doc(ref).get()
    .then((doc) => {
      if (doc.exists) {
        console.log(`Document data ${doc.data()}`);
        res.status(200).json(doc.data())
      } else {
        console.log("No such document!");
      }
    })
    .catch((err) => {
      console.log('Error getting document data:', err);
      res.status(500).json({"error":"getting documents data"});
    })
  })

  router.put('/api/:product/:collection/:id', (req, res, next) => {
    let ref = `${req.params.product}/pets/${req.params.collection}/${req.params.id}`;
    db.doc(ref).update(req.body)
    .then((r) => {
      console.log(`Document updated successfully`);
      res.status(200).json({"document":"updated"});
    })
    .catch((err) => {
      console.log('Error updating document:', err);
      res.status(500).json({"error":"updating"});
    })
  })

  router.delete('/api/:product/:collection/:id', (req, res, next) => {
    let ref = `${req.params.product}/pets/${req.params.collection}/${req.params.id}`;
    db.doc(ref).delete()
    .then(() => {
      console.log('Document successfully deleted.');
      res.status(200).json({"Document":"deleted"});
    })
    .catch((err) => {
      console.log('Error deleting documents:', err);
      res.status(500).json({"error":"deleting"});
    })
  })

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

module.exports = productsApi

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}