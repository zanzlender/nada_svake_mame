import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: '',
      clientEmail: '',
      privateKey: ''
    }),
    databaseURL: ''
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
