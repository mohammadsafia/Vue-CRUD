import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyDcBL5g9MWRY6WVSVeqArudKWNKZZO5efs",
  authDomain: "ninja-smoothies-1998.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-1998.firebaseio.com",
  projectId: "ninja-smoothies-1998",
  storageBucket: "ninja-smoothies-1998.appspot.com",
  messagingSenderId: "1010913588455",
  appId: "1:1010913588455:web:0aa39a820c8c0cf3169e42",
  measurementId: "G-DMD62JQBJC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
