import { Navigate, useParams } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import { useState, useEffect } from "react";
import { Section, InfoRuta, ButtonContainer } from "../../StylingElements/SectionsAdmin/AdminComponents";
import KursAddOrChange from "../Forms/KursAddOrChange";
import { useSeveralRoutesFirebase } from "../../utils/useSeveralRoutesFirebase";

const Kurs = () => {
  const {id} = useParams()
  let noId = Number(id)
  // const {data} = useFirebase("/courses")
  const [changeForm, setChangeForm] = useState(false);
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
    <h1>Kursdetaljer</h1>
    {courses && courses.filter(item => item.courseID === noId).map(item => ( 
      
    <InfoRuta key={noId}>
      {changeForm ? (
      <KursAddOrChange 
      typeOfForm={"changeCourse"}
      students = {students}
      teachers = {teachers}
      courses = {courses}
      title = {"Ändra:"}
      ID={noId}
      onChangeForm = {() => setChangeForm(false)}
      courseExists={item}/>
   
    ):(<>
        <h1>{item.courseName}</h1>
          <p>Beskrivning: {item.courseDescription}</p>
          {item.published && <>
          <p>Start:{item.startDate}</p>
          <p>Längd: {item.lengthWeeks} veckor</p>  
          <p>Publicerad kurs</p>
          <p>Antal deltagare anmälda: {item.studentsAssigned}</p>
          </>}
          {!item.published && item.studentsAssigned < 5 && <>
            <h3>Ej publicerad kurs</h3>
            <p>Planerad start: {item.startDate}</p>
            <p>Antal deltagare anmälda hittills: {item.studentsAssigned}/5</p>
          </>}
          {!item.published && item.studentsAssigned >= 5 && <>
          <h3>Ej publicerad kurs</h3> 
          <p>Start:{item.startDate}</p>
          <p>Minimum deltagare: 5 <br /> Antal deltagare anmälda hittills: {item.studentsAssigned}</p>
          </>}
          <ButtonContainer>
          <button 
          onClick={() => Navigate(-1)}>
          Gå tillbaka</button>
          <button 
          onClick={() => setChangeForm(true)}>
          Redigera kurs</button>
          </ButtonContainer>
      </>
    )}
    </InfoRuta>
    ))}
  </Section> );
}
export default Kurs;