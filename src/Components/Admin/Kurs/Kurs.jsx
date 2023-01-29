import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Section, InfoRuta, ButtonContainer, KursDetails, TwoSquares } from "../../StylingElements/SectionsAdmin/AdminComponents";
import KursAddOrChange from "../Forms/KursAddOrChange";



const Kurs = ({coursesDB, teachersDB, competencesDB}) => {
  const {id} = useParams()
  let noId = Number(id)
  const navigate = useNavigate()

  const [changeForm, setChangeForm] = useState(false);
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])
  const [competences, setCompetences] = useState([])

  useEffect(() => {
    if(teachersDB){
      setTeachers(teachersDB.map(item =>item))
    }
    if(coursesDB){
      setCourses(coursesDB.map(item => item))
    }
    if(competencesDB){
      setCompetences(competencesDB.map(item =>item))
    }
  }, [teachersDB, coursesDB, competencesDB])

  return ( 
  <Section>
    {!teachersDB && !coursesDB ? <p>Laddar..</p>: <>
    {courses.filter(item => item.courseID === noId).map(item => ( 
    <TwoSquares key={noId}>
    <>
      {changeForm ? (
        <InfoRuta>
      <KursAddOrChange 
      typeOfForm={"changeCourse"}
      teachers = {teachers}
      competences = {competences}
      courses = {courses}
      title = {"Ändra:"}
      ID={noId}
      onChangeForm = {() => setChangeForm(false)}
      courseExists={item}/>
      </InfoRuta>
    ):(<>
      <InfoRuta>
    <KursDetails>
        <h1>{item.courseName}</h1>
          <p><strong>Beskrivning:</strong><br/> 
          {item.courseDescription}</p>
      
          
          <p><strong>Lärare:</strong><br/> {item.teacherAssigned}</p>
      </KursDetails>
      </InfoRuta>
     <InfoRuta 
     About>
      {item.published && <>
      <div className="Row">
      <p><strong>Start:</strong> {item.startDate}</p>
      <p><strong>Längd:</strong> {item.lengthWeeks} veckor</p>
      </div>
      <p>Deltagare: {item.studentsAssigned}</p>
      <h3><strong>Publicerad kurs</strong></h3>
      </>}
      {!item.published && item.studentsAssigned < 5 && <>
      <p><strong>Ej publicerad kurs</strong></p>
      <p><strong>Planerad start:</strong><br/> {item.startDate}</p>
      <p>Anmälda deltagare: <br/>{item.studentsAssigned}/5</p>
      </>}
      {!item.published && item.studentsAssigned >= 5 && <>
      <h3>Ej publicerad kurs</h3> 
      <p><strong>Start:</strong><br/> {item.startDate}</p>
      <p><strong>Minimum deltagare: 5 </strong><br /> Antal anmälda: <br/>{item.studentsAssigned}</p>
      </>}
    </InfoRuta>
    <InfoRuta>
    <ButtonContainer
    About>
      <button 
        onClick={() => setChangeForm(true)}>
        Redigera kurs
      </button>
      <button 
        onClick={() => navigate(-1)}>
        Gå tillbaka
      </button>
    </ButtonContainer>
    </InfoRuta>
    </>
    )}</>
 
    </TwoSquares>
    ))}</>}
   
  </Section> );
}
export default Kurs;