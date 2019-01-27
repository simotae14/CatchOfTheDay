import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBqbST63BVZ3o9M1z7f_RTtvo7MiQyxo60",
    authDomain: "catch-of-the-day-simone-taeggi.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-simone-taeggi.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named Export
export { firebaseApp };

// This is the default export
export default base;