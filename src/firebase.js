import firebase from 'firebase/app'
import 'firebase/firestore';
import env from "react-dotenv";

var firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: "bluefarmamjpos.firebaseapp.com",
    databaseURL: "https://react-firebase-crud-2d065.firebaseio.com",
    projectId: env.PROJECT_ID,
    storageBucket: "react-firebase-crud-2d065.appspot.com",
    messagingSenderId: env.MESSAGING_SENDER_ID,
    appId: env.APP_ID,
    measurementId: "G-P307XV6FHD"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
