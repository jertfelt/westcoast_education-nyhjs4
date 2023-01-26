import { InfoRuta, Section } from "../../StylingElements/SectionsAdmin/AdminComponents";
import { useState, useEffect } from "react";
import KursAddOrChange from "../Forms/KursAddOrChange"
import { useSeveralRoutesFirebase } from "../../utils/useSeveralRoutesFirebase";


const AddKurs = ({coursesDB, studentsDB, teachersDB}) => {

  const [teachers, setTeachers] = useState([])
  const [students,setStudents] = useState([])
  const [courses, setCourses] = useState([])

  
  useEffect(() => {
    if(teachersDB){
      setTeachers(teachersDB.map(item =>item))
     
    }
    if(studentsDB){
      setStudents(studentsDB.map(item => item))
      
    }
    if(coursesDB){
      setCourses(coursesDB.map(item => item))
    }
    
  }, [teachersDB, studentsDB, coursesDB])
  
  return ( 
  <Section 
  data-testid="addkurswrapper">
    <InfoRuta>
      {!teachersDB && !studentsDB && !coursesDB ? <h1>Laddar...</h1>:
      <KursAddOrChange
      data-testid="formKurs"
      typeOfForm = {"registerNew"}
      students = {students}
      teachers = {teachers}
      courses = {courses}
      title = {"Registrera ny kurs:"}
      ID= {""}
      onChangeForm = {""}
      courseExists = {""}
      />}
      
     
    </InfoRuta>
  </Section> );
}
 
export default AddKurs;