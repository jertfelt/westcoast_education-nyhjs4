import { useState, useEffect, useContext} from "react";
import StudentContext from "../../Context/StudentContext";

import Studentsections from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";
import RegisterCourseForm from "./RegisterCourseForm";


const RegistreringKurs = (props) => {
const [thisStudent, setThisStudent] = useState("")
const context = useContext(StudentContext);
const {data} = useFirebase("/students")
// console.log("hej", data, "cotnext:", context)
const [errMsg, setErrMsg] = useState("")
const [id, setID] = useState([])
const [error, setError] =useState(false)
const [coursesInDB, setCoursesInDataBase] = useState([])

useEffect(() =>{
  if(data){
    if(context.studentID === ""){
      let check = data.filter(function (student){
        return student.studentEmail === context.studentEmail})
      if (check.length === 1){
        setThisStudent(data.filter(function (student){
          return student.studentEmail === context.studentEmail}).map(item => item))
          let iddb = check.map(item => item.studentID)
          setID(iddb[0])
          let courses = check.map(item => item.courses)
          setCoursesInDataBase(courses)
      }
      else if(check.length === 0){
        setError(true)
        setErrMsg("Finns inget mail som matchar. Prova att logga ut och in igen.")
      }
      else{
        check.filter(function (student){
          return student.studentName === context.studentName}).map(item => item)
      }
        
    }
    // else{
    //   console.log("test", data.filter(function (stud){return stud.studentEmail === context.studentEmail}))
    //   let studentsMatching = data.filter(function (student){
    //     return student.studentName === context.studentName})
       

    //   if(studentsMatching.length === 1){
          
    //     }
    // }
  }
}, [data, id, context.studentID, context.studentEmail, context.studentName])



  return ( 
  <Studentsections 
  data-testid="RegisterStudentKurs">
  {error ? <p>{errMsg}</p>: 
  <RegisterCourseForm 
  studentid = {id}
  item = {thisStudent}
  coursesInDB = {coursesInDB}
  />}
    
  </Studentsections> );
}
 
export default RegistreringKurs ;