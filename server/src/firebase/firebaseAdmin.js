const admin = require('firebase-admin');
const serviceAccount = require('/etc/secrets/culinairy-f6a1e-firebase-adminsdk-mn0hc-b88f9157ef.json'); // Replace with your service account key file

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://culinairy-f6a1e.firebaseio.com`,
    });
}

const db = admin.firestore();
db.collection('test').get()
    .then(() => console.log('Firestore connection successful'))
    .catch(error => console.error('Firestore connection error:', error));

module.exports = db;
