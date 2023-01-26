import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Section, InfoRuta, ButtonContainer, KursDetails } from "../../StylingElements/SectionsAdmin/AdminComponents";
import KursAddOrChange from "../Forms/KursAddOrChange";


const Kurs = ({coursesDB, teachersDB, competencesDB}) => {
  const {id} = useParams()
  let noId = Number(id)
  const navigate = useNavigate()

  const [changeForm, setChangeForm] = useState(false);
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    if(teachersDB){
      setTeachers(teachersDB.map(item =>item))
    }
   
    if(coursesDB){
      setCourses(coursesDB.map(item => item))
    }
  }, [teachersDB, coursesDB])

  return ( 
  <Section>
    {!teachersDB && !coursesDB ? <p>Laddar..</p>: <>
    {courses.filter(item => item.courseID === noId).map(item => ( 
      
    <InfoRuta key={noId}>
      {changeForm ? (
      <KursAddOrChange 
      typeOfForm={"changeCourse"}
      teachers = {teachers}
      
      courses = {courses}
      title = {"Ändra:"}
      ID={noId}
      onChangeForm = {() => setChangeForm(false)}
      courseExists={item}/>
   
    ):(<KursDetails>
        <h1>{item.courseName}</h1>
          <p><strong>Beskrivning:</strong><br/> 
          {item.courseDescription}</p>
          
          {item.published && <>
          <div className="Row">
          <p><strong>Start:</strong> {item.startDate}</p>
          <p><strong>Längd:</strong> {item.lengthWeeks} veckor</p>
          </div>
          <p>Deltagare: {item.studentsAssigned}</p>
          <h3><strong>Publicerad kurs</strong></h3>
          </>}
          {!item.published && item.studentsAssigned < 5 && <>
            <h3>Ej publicerad kurs</h3>
            <p><strong>Planerad start:</strong> {item.startDate}</p>
            <p>Anmälda deltagare: {item.studentsAssigned}/5</p>
          </>}
          {!item.published && item.studentsAssigned >= 5 && <>
          <h3>Ej publicerad kurs</h3> 
          <p><strong>Start:</strong> {item.startDate}</p>
          <p><strong>Minimum deltagare: 5 </strong><br /> Antal anmälda: {item.studentsAssigned}</p>
          </>}
          <ButtonContainer>
          <button 
          onClick={() => navigate(-1)}>
          Gå tillbaka</button>
          <button 
          onClick={() => setChangeForm(true)}>
          Redigera kurs</button>
          </ButtonContainer>
      </KursDetails>
    )}
    </InfoRuta>
    ))}</>}
  </Section> );
}
export default Kurs;