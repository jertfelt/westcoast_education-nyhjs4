//*firebase:
import initFirebase from "./initFirebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState} from "react";


export function GetDb(route1, route2, route3, route4){
  const [courses, setCourses] = useState(null)
  const [students, setStudents] = useState(null)
  const [teachers, setTeachers] = useState(null)
  const [competences, setCompetences] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false)
  
  const getDataFromFirebase = (route1, route2, route3, route4) => {
    const db = getDatabase()
    onValue(ref(db, route1), (snapshot) => {
    setCourses(snapshot.val())
   
    })
    onValue(ref(db, route2), (snapshot) => {
    setStudents(snapshot.val())
    })
    onValue(ref(db, route3), (snapshot) => {
    setTeachers(snapshot.val())
    })
    onValue(ref(db, route4), (snapshot) => {
      setCompetences(snapshot.val())
    })
  }
  
  
    useEffect(() => {(
      async function(){
        try{
          setLoading(true)
          initFirebase()
          getDataFromFirebase(route1, route2, route3, route4)
        }catch(err){
          setError(err)
        }finally{
          setLoading(false)
        }
      })()
    },[route1, route2, route3, route4])
    return {courses,students,teachers,competences, error, loading}
}