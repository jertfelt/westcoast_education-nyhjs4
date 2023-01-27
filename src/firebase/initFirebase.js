import { initializeApp } from 'firebase/app'
import {  getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database'



const clientCredentials = {

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH, 
  databaseURL: process.env.REACT_APP_DBURL, 
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MSGSENDERID,
  appId: process.env.REACT_APP_APP_ID
}

const initFirebase = () => {
  const app = initializeApp(clientCredentials)
  const auth = getAuth(app)
  const db = getDatabase(app)
}



export default initFirebase