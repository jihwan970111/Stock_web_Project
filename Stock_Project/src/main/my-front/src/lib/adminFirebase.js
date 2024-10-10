const admin = require('firebase-admin');
const serviceAccount = require('/Users/parkjihwan/Documents/development/react-chat-3bf1b-firebase-adminsdk-jb8w8-8a4d6459f9.json');

// Firebase Admin SDK 초기화 (Firestore만 사용)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
