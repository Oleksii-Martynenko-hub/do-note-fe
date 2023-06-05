import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'my-works-notes-tasks.firebaseapp.com',
  projectId: 'my-works-notes-tasks',
  databaseURL: 'https://my-works-notes-tasks-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'my-works-notes-tasks.appspot.com',
  messagingSenderId: '335372237019',
  appId: '1:335372237019:web:8e13cc3795990281fe34fe',
  measurementId: 'G-P4M4YDQ934',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage().ref();

export default firebase;
