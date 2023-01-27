import { useState, useEffect, useContext} from "react";
import StudentContext from "../../Context/StudentContext";

import Studentsections from "../../Components/StylingElements/StudentSections/StudentSections";

import RegisterCourseForm from "./RegisterCourseForm";


const RegistreringKurs = (props,{ studentsDb, courses}) => {
const [thisStudent, setThisStudent] = useState("")
const context = useContext(StudentContext);
const [data, setData] = ""
const [errMsg, setErrMsg] = useState("")
const [id, setID] = useState([])
const [error, setError] =useState(false)
const [course1, setCourse1] = useState("default")
console.log(studentsDb,"test")
useEffect(() => {
  if(studentsDb){
    setData(studentsDb)
  }
})

useEffect(() =>{
  if(data){
    if(context.studentID === "" || !context.studentID || context.studentID === []){
      let check = data.filter(function (student){
        return student.studentEmail === context.studentEmail})
      if (check.length === 1){
        setThisStudent(data.filter(function (student){
          return student.studentEmail === context.studentEmail}).map(item => item))
          let iddb = check.map(item => item.studentID)
          setID(iddb[0])
          setCourse1(check.map(item => item.studentCourseFirstChoice))
         
      }
      else if(check.length === 0){
        setError(true)
        setErrMsg("Finns inget mail som matchar. Prova att logga ut och in igen.")
      }
      else{
        let checkName = check.filter(function (student){
          return student.studentName === context.studentName}).map(item => item)
        setThisStudent(checkName)

          let iddb = checkName.map(item => item.studentID)
          setID(iddb[0])
          setCourse1(checkName.map(item => item.studentCourseFirstChoice))
         
      }
        
    }
    else{
      let studentsMatching = data.filter(function (stud){return stud.studentID === Number(context.studentID)})
      setThisStudent(studentsMatching)
      let idContext = Number(context.studentID)
      setID(idContext)
      setCourse1(studentsMatching.map(item => item.courses))
    }
  }
}, [data, id, context.studentID, context.studentEmail, context.studentName])

console.log(courses, "d")

  return ( 
  <Studentsections 
  data-testid="RegisterStudentKurs">
  {error ? <p>{errMsg}</p>: 
  <RegisterCourseForm 
  ifDirected = {props.name}
  studentid = {id}
  item = {thisStudent}
  course1 = {course1}
  allCourses = {courses}
  />}
    
  </Studentsections> );
}
 
export default RegistreringKurs ;