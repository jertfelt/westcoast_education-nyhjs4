import { InfoRuta, Section } from "../../StylingElements/SectionsAdmin/AdminComponents";
import { useState, useEffect } from "react";
import KursAddOrChange from "../Forms/KursAddOrChange"
import { useSeveralRoutesFirebase } from "../../utils/useSeveralRoutesFirebase";


const AddKurs = () => {

  const [teachers, setTeachers] = useState([])
  const [students,setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const {data1, data2, data3, error, loading} = useSeveralRoutesFirebase("/teachers", "/students", "/courses")

  
  useEffect(() => {
    if(data1){
      setTeachers(data1.map(item =>item))
      setStudents(data2.map(item => item))
      setCourses(data3.map(item => item))
    }
    
  }, [data1, data2, data3])
  
  return ( 
  <Section>
    <InfoRuta>
      {loading && <p>Laddar...</p>}
      {courses && 
      <KursAddOrChange
      typeOfForm = {"registerNew"}
      students = {students}
      teachers = {teachers}
      courses = {courses}
      title = {"Registrera ny kurs:"}
      ID= {""}
      onChangeForm = {""}
      courseExists = {""}
      />}
      {error && <h1>Något är fel på sidan.</h1>} 
    </InfoRuta>
  </Section> );
}
 
export default AddKurs;