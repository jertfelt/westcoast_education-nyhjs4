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

// const FireBase = () => {
  
//   const [courses, setCourses] = useState("")
//   const [teachers, setTeachers] = useState("")
//   const [students, setStudents] = useState("")
//   const [competences, setCompetences] = useState("")


// const getDataFromFirebase1 = (route) => {
//     const db = getDatabase()
//     const dbRef = ref(db, route)
//     onValue(dbRef, (snapshot) => {
//     setTeachers(snapshot.val())
//     })
// }
// const getDataFromFirebase2 = (route) => {
//   const db = getDatabase()
//   const dbRef = ref(db, route)
//   onValue(dbRef, (snapshot) => {
//   setCourses(snapshot.val())
//   })
// }
// const getDataFromFirebase4 = (route) => {
//   const db = getDatabase()
//   const dbRef = ref(db, route)
//   onValue(dbRef, (snapshot) => {
//   setCompetences(snapshot.val())
//   })
// }

// const getDataFromFirebase3 = (route) => {
//   const db = getDatabase()
//   const dbRef = ref(db, route)
//   onValue(dbRef, (snapshot) => {
//   setStudents(snapshot.val())
//   })
// }


// useEffect(() => {
//     initFirebase()
//     getDataFromFirebase1('/teachers')
//     getDataFromFirebase2("/courses")
//     getDataFromFirebase3("/students")
//     getDataFromFirebase4("/competences")
// }, [])

// return {teachers, courses, students, competences}
// }