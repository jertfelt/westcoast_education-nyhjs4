import { initializeApp } from 'firebase/app'
import {  getAuth} from 'firebase/auth';
import { getDatabase, set } from 'firebase/database'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';

const clientCredentials = {

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH, 
  databaseURL: process.env.REACT_APP_DBURL, 
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MSGSENDERID,
  appId: process.env.REACT_APP_APP_ID
}
const app = initializeApp(clientCredentials)
const auth2 = getAuth(app)
const db = getDatabase(app)

const initFirebase = () => {
  const app = initializeApp(clientCredentials)
  const auth = getAuth(app)
  const db = getDatabase(app)
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth2, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth2, email, password);
    const user = res.user;
    await set(db, "admin", {
      uid: user.uid,
      name,
      authProvider: "admin",
      email,
    });
  } catch (err) {
    console.error("err", err);
    if(err.message === "auth/email-already-in-use"){
      alert("Användaren är redan registrerad!")
    }
    else if(err.message === "auth/invalid-email"){
      alert("Fyll i en korrekt email-adress")

    }
    else if(err.message === "auth/weak-password"){
      alert("För svag lösenord,välj något annat.")

    }
    else if(err.message === "path is undefined"){
      console.log(err.message)
    }
    else{
      alert("Registrering misslyckades, prova igen eller kontakta administratören för hemsidan.")
    }
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth2, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth2);
};

export {
  auth2,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};

export default initFirebase

