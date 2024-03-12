import firebase from 'firebase/app';
import 'firebase/firestore'; // Import other Firebase services if you plan to use them

const firebaseConfig = {
  apiKey: "AIzaSyC3R66cAGYcWL-oZg9JhbE5lxMPqBySnXg",
  authDomain: "ordersystem-5af67.firebaseapp.com",
  databaseURL: "https://ordersystem-5af67-default-rtdb.firebaseio.com",
  projectId: "ordersystem-5af67",
  storageBucket: "ordersystem-5af67.appspot.com",
  messagingSenderId: "595456723593",
  appId: "1:595456723593:web:36d5504bc4a8fffd615458",
  measurementId: "G-MYSEY03D1X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
