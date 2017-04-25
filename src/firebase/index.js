import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAeqkmOgDVq8YAkbVRt50Q6AY6rA3hGSok",
    authDomain: "are-you-ready.firebaseapp.com",
    databaseURL: "https://are-you-ready.firebaseio.com",
    projectId: "are-you-ready",
    storageBucket: "are-you-ready.appspot.com",
    messagingSenderId: "987430184367"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();