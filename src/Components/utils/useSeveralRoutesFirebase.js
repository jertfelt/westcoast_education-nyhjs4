import { useEffect, useState } from 'react';

//*---firebase:
import initFirebase from "../../firebase/initFirebase";
import {getDatabase, ref, onValue} from "firebase/database"


export function useSeveralRoutesFirebase(route1, route2, route3){
const [data1, setData1] = useState(null)
const [data2, setData2] = useState(null)
const [data3, setData3] = useState(null)
const [loading, setLoading] = useState(null)
const [error, setError] = useState(false)

const getDataFromFirebase = (route1, route2, route3) => {
  const db = getDatabase()
  const dbRef1 = ref(db, route1)
  const dbRef2 = ref(db, route2)
  const dbRef3 = ref(db, route3)

  onValue(dbRef1, (snapshot) => {
  setData1(snapshot.val())
  })
  onValue(dbRef2, (snapshot) => {
  setData2(snapshot.val())
  })
  onValue(dbRef3, (snapshot) => {
  setData3(snapshot.val())
  })
}

useEffect(() => {(
  async function(){
    try{
      initFirebase()
      setLoading(true)
      getDataFromFirebase(route1, route2, route3)
      
    }catch(err){
      setError(err)
    }finally{
      setLoading(false)
    }
  })()
},[route1, route2, route3])

 return {data1, data2, data3, error, loading}
}
