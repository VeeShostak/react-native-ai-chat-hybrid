import * as firebase from 'firebase'; // take all exports and toss them on 1 named var
// create instance of a provider for Auth

const config = {
  apiKey: "AIzaSyB_Q8zZFlbdcfdYTuobcRDx6Q41R-Ccfd8",
  authDomain: "chatai-cd580.firebaseapp.com",
  databaseURL: "https://chatai-cd580.firebaseio.com",
  projectId: "chatai-cd580",
  storageBucket: "chatai-cd580.appspot.com",
  messagingSenderId: "46134318898"
};


firebase.initializeApp(config);



const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();




export {firebase, googleAuthProvider, database as default};

//console.error('ERROR');