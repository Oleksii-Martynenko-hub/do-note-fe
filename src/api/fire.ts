import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAxQlsgkke3eVV2dRwjJ_gY3XMB0bA-w6E',
  authDomain: 'my-works-notes-tasks.firebaseapp.com',
  projectId: 'my-works-notes-tasks',
  storageBucket: 'my-works-notes-tasks.appspot.com',
  messagingSenderId: '335372237019',
  appId: '1:335372237019:web:8e13cc3795990281fe34fe',
  measurementId: 'G-P4M4YDQ934',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
