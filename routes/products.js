const express = require('express');
const admin = require('firebase-admin');
const { serviceKey, serviceUrl } = require('../config')

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  databaseURL: serviceUrl
});

let db = admin.firestore();

function productsApi (app){
  const router = express.Router();
  app.use('/api', router);

  router.post('/:product/:collection', (req, res, next) => {
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

  router.delete('/:product/:collection/:id', (req, res, next) => {
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

  router.get('/:product/:collection', (req, res, next) => {
    let ref = `${req.params.product}/pets/${req.params.collection}`;
    db.collection(ref).get()
    .then((snapshot) => {
      let documentsId = {}
      console.log(`This are the documents in ${req.params.collection} collection:`)
      snapshot.forEach((doc) => {
        documentsId[doc.id] = doc.data().name;
        console.log(doc.id, '->', doc.data().name);
      })
      res.status(200).json(documentsId);
    }) 
    .catch((err) => {
      console.log('Error getting documents:', err);
      res.status(500).json({"error":"getting documents"});;
    })
  })

  router.get('/:product/:collection/:id', (req, res, next) => {
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
      console.log('Error getting document:', err);
      res.status(500).json({"error":"getting document"});;
    })
  })

  router.put('/:product/:collection/:id', (req, res, next) => {
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

}

module.exports = productsApi