//*firebase:
import initFirebase from "./initFirebase";
import {child, get, getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState} from "react";


export function GetDb(
  route1, 
  route2, 
  route3, 
  route4){

  const [courses, setCourses] = useState(null)
  const [students, setStudents] = useState(null)
  const [teachers, setTeachers] = useState(null)
  const [competences, setCompetences] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false)
  
 function getDataFromFirebase (
  route1, 
  route2, 
  route3,
  route4){
    const db = getDatabase()
    const dbRefR1 = ref(db, route1)
    const dbRefR2 = ref(db, route2)
    const dbRefR3 = ref(db, route3)
    const dbRefR4 = ref(db, route4)
   
    onValue(dbRefR1, (snapshot) => {
    setCourses(snapshot.val())
    })
    onValue(dbRefR2, (snapshot) => {
    setStudents(snapshot.val())
    })
    onValue(dbRefR3, (snapshot) => {
    setTeachers(snapshot.val())
    })

    // get((dbRefR1)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     setCourses(snapshot.val())
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   setError(error);
    // });

    // get((dbRefR2)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     setStudents(snapshot.val())
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   setError(error);
    // });


    // get((dbRefR3)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     setTeachers(snapshot.val())
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   setError(error);
    // });
   
    get((dbRefR4)).then((snapshot) => {
      if (snapshot.exists()) {
        setCompetences(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      setError(error);
    });
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

