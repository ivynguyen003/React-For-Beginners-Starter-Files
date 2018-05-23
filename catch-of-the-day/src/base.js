import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBkYmHN1xROaRQwftJkJk9RVeWgTS9p2Us",
  authDomain: "catch-of-the-day-ivy.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-ivy.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base; 