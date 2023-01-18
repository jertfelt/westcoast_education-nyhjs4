import { initializeApp } from 'firebase/app'
import {  getAuth} from 'firebase/auth';

import { getDatabase } from 'firebase/database'



const clientCredentials = {
  apiKey: "AIzaSyBj_ocbD0O1j13HCB3Bv2LnDzflVzhlrVs",
  authDomain: "weducation-7e828.firebaseapp.com",
  databaseURL: "https://weducation-7e828-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weducation-7e828",
  storageBucket: "weducation-7e828.appspot.com",
  messagingSenderId: "206585641573",
  appId: "1:206585641573:web:fd2cd3322d30904b0ce48c"
}

const initFirebase = () => {
  const app = initializeApp(clientCredentials)
  const auth = getAuth(app)
  const db = getDatabase(app)
}


export default initFirebase