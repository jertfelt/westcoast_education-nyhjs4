import { useState, useEffect, useContext} from "react";
import StudentContext from "../../Context/StudentContext";

import Studentsections from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";
import RegisterCourseForm from "./RegisterCourseForm";


const RegistreringKurs = (props) => {

const [thisStudent, setThisStudent] = useState("")
const context = useContext(StudentContext);
const {data} = useFirebase("/students")
console.log("hej", data, "cotnext:", context)
const [errMsg, setErrMsg] = useState("")

useEffect(() =>{
  if(data){
    
    if(context.studentID === ""){
      let check = data.filter(function (student){
        return student.studentEmail === context.studentEmail})
      if (check.length === 1){
        setThisStudent(data.filter(function (student){
          return student.studentEmail === context.studentEmail}).map(item => item))
      }
      else if(check.length === 0){
        setErrMsg("Finns inget mail som matchar. Prova att logga ut och in igen.")
      }
      else{
        
        check.filter(function (student){
          return student.studentName === context.studentName}).map(item => item)
      }
        
    }
    else{
      if(data.filter(function (student){
        return student.studentName === context.studentName}).length === 1){
          console.log("hej")
        }
    }
  
    
    
  }
}, [])
  return ( 
  <Studentsections 
  data-testid="RegisterStudentKurs">
    <RegisterCourseForm />
  

  </Studentsections> );
}
 
export default RegistreringKurs ;