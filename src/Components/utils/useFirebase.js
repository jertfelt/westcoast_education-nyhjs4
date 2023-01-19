import { useEffect, useState } from 'react';

//*---firebase:
import initFirebase from "../../firebase/initFirebase";
import {getDatabase, ref, onValue} from "firebase/database"


export function useFirebase(route){
const [data, setData] = useState(null)
const [loading, setLoading] = useState(null)
const [error, setError] = useState(false)

const getDataFromFirebase = (route) => {
  const db = getDatabase()
  const dbRef = ref(db, route)
  onValue(dbRef, (snapshot) => {
  setData(snapshot.val())
  })
}

useEffect(() => {(
  async function(){
    try{
      initFirebase()
      setLoading(true)
      getDataFromFirebase(route)
      
    }catch(err){
      setError(err)
    }finally{
      setLoading(false)
    }
  })()
},[route])

 return {data, error, loading}
}
