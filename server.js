const express = require('express');
const admin = require('firebase-admin');
const { serviceKey, port } = require('./config')

const serviceAccount = serviceKey;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cohort1-teamdiego.firebaseio.com"
});

let db = admin.firestore();

const app = express();

app.get('/', (req, res) => {
  res.send("HOME")
})

app.get('/api', (req, res) => {
  db.collection('test').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        res.send(`${doc.id} -> ${doc.data()}`);
        console.log(doc.id, '->', doc.data());
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
})

app.listen(port, () => {
  console.log("Listening in port", port)
});