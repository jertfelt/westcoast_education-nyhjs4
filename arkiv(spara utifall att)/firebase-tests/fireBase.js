import { initializeApp } from 'firebase/app'
import {  getAuth,  signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';


import { getDatabase, set } from 'firebase/database'



const clientCredentials = {
  apiKey: "AIzaSyBj_ocbD0O1j13HCB3Bv2LnDzflVzhlrVs",
  authDomain: "weducation-7e828.firebaseapp.com",
  databaseURL: "https://weducation-7e828-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weducation-7e828",
  storageBucket: "weducation-7e828.appspot.com",
  messagingSenderId: "206585641573",
  appId: "1:206585641573:web:fd2cd3322d30904b0ce48c"
}
const app = initializeApp(clientCredentials)
const auth = getAuth(app)
const db = getDatabase(app)

const initFirebase = () => {
  const app = initializeApp(clientCredentials)
  const auth = getAuth(app)
  const db = getDatabase(app)
}



const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await set(db, "students", {
      uid: user.uid,
      name,
      authProvider: "student",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};


export default initFirebase