import firebase from 'Firebase/app';
import 'firebase/auth';

const FirebaseConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_PUBLIC_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// if a Firebase instance doesn't exist, create one
if (!firebase.getApps().length) {
  firebase.initializeApp(FirebaseConfig);

  /* Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
       // Enable analytics. https://firebase.google.com/docs/analytics/get-started
       if ('measurementId' in clientCredentials) {
         firebase.analytics()
         firebase.performance()
       }
    } */
}

export default firebase;
