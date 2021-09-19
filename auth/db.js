//firestore
var admin = require("firebase-admin");

var serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ebookgratis-24795-default-rtdb.firebaseio.com"
});

var db = admin.firestore();

module.exports = db