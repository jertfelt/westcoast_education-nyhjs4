import { useParams } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FormWOInstructions } from "../../StylingElements/Form/Form";
import { useDates } from "../../utils/useDates";
import {getDatabase, update, ref} from "firebase/database"

const Section = styled.section`
display: flex;
align-items:center;
flex-direction:column-reverse;
justify-content:center;
padding:10rem;
`

const InfoRuta = styled.div`
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
max-width:500px;
padding:2rem;
padding-top:0rem;
ul{
  list-style:none;
}
margin-bottom:-2rem;
`

const ButtonContainer = styled.div`
display:flex; 
align-items: center; 
gap: 8px;
button{
  padding: 4px 8px;
  color: ${({ theme }) => theme.toggleBorder};
  background: ${({ theme }) => theme.accent};
border:none;
border-radius:30px;
margin-top:1rem;
&:hover{
  background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
}
}
`



const Kurs = () => {
  const {id} = useParams()
  let noId = Number(id)
  
 
  const {data} = useFirebase("/courses")
  const {year, nextYear} = useDates()

  const courseNameRef = useRef()
  const courseDescriptionRef = useRef()
  const startDateref = useRef()
  const lengthWeeksRef =  useRef()
  const studentsAssignedRef = useRef()
  const [isLoading, setLoading] = useState(false)
  const [changeForm, setChangeForm] = useState(false);
  const [publishedStatus, setPublishedStatus] = useState(null)
  const [courseID, setCourseID] = useState(null)

  useEffect(() => {
    if(data){
      if(data.filter(item => item.courseID === noId).map(item => item.published)[0] === true){
        setPublishedStatus(true)
      }
      else{
        setPublishedStatus(false)
      }
      setCourseID(data.filter(item => item.courseID === noId).map(item =>item.courseID)[0])
      
    }
  },[data,noId])
  

  const clearForm = () =>{
  courseNameRef.current.value = ""
  courseDescriptionRef.current.value = ""
  startDateref.current.value = ""
  lengthWeeksRef.current.value = ""
  studentsAssignedRef.current.value = ""
  }

  const setToPublished = (e) => {
    e.preventDefault()
    if(data.filter(item => item.courseID === noId).map(item => item.published)[0] === true){
      setPublishedStatus(false)
    }
    else{
      setPublishedStatus(true)
    }
  }
  
 
  const handleDiscard = (e) => {
    setChangeForm(false)
    clearForm()
  }

  const confirmSave = (e) => {
  e.preventDefault()
  setLoading(true)
  const courseName = courseNameRef.current.value;
  const courseDescription = courseDescriptionRef.current.value
  const startDate = startDateref.current.value
  const lengthWeeks = lengthWeeksRef.current.value
  const studentsAssigned = studentsAssignedRef.current.value
  const published = publishedStatus

  const courseItem = {
    courseName,
    courseDescription,
    startDate,
    lengthWeeks,
    studentsAssigned,
    published
  }
  sendEditToFirebase(courseItem)
  }

  const sendEditToFirebase = (courseItem) => {
    const db = getDatabase()
    const dbRef = ref(db, `/kurser/${courseID}`)
    update(dbRef, {text:courseItem})
  }

  useEffect(() => {
    if(isLoading){
        setTimeout(() => {
            setLoading(false)
            setChangeForm(false)
        }, 2000);
    }}, [isLoading])
    
 
  return ( 
  <Section>
    <InfoRuta>
      
    {changeForm && 
        <FormWOInstructions onSubmit={confirmSave}>
          {isLoading ? <h2>Laddar..</h2>:<h2>Ändra:</h2>}
          <label htmlFor="courseNameChangeInput">Kursnamn:</label>
          <input id="courseNameChangeInput"
          type="text"
          ref={courseNameRef}
          placeholder= "Kursnamn:"
          />
          <label htmlFor="courseDescriptionChangeInput">Kursbeskrivning:</label>
          <textarea id="courseDescriptionChangeInput"
          type="text"
          maxLength="50"
          ref={courseDescriptionRef}
          placeholder= "Kursbeskrivning, max 50 tecken."
          />
          <label htmlFor="startDateChangeInput">Startdatum:</label>
          <input 
          id="startDateChangeInput"
          type="date"
          defaultValue={year}
          min={year}
          max={nextYear}
          ref={startDateref}
          />
          <label htmlFor="lengthWeeksChangeInput">Antal veckor:</label>
          <input 
          id="lengthWeeksChangeInput"
          type="number"
          defaultValue={2}
          min={2}
          max={15}
          ref={lengthWeeksRef}
          />
          <label htmlFor="studentsAssignedChangeInput">Antal studenter:</label>
    {data && data.filter(item => item.courseID === noId).map(item => (
        <input 
        key={item.courseID}
        id="studentsAssignedChangeInput"
        defaultValue={item.studentsAssigned}
        type="number"
        ref={studentsAssignedRef}
        />
      ))}
      {!isLoading && <>
      <input type="submit"
      value="Ändra"/>
      <button onClick={handleDiscard}>
        Stäng</button>
        </>
      }
          </FormWOInstructions>}

    {data && data.filter(item => item.courseID === noId).map(item => (
          <div key= {item.id}>
          <h1>{item.courseName}</h1>
          <p>Beskrivning: {item.courseDescription}</p>
          {item.published && <>
          
          <p>Start:{item.startDate}</p>
          <p>Längd: {item.lengthWeeks} veckor</p>  
          <p>Publicerad kurs</p>
          <p>Antal deltagare anmälda: {item.studentsAssigned}</p>
          <ButtonContainer>
          <button 
          onClick={setToPublished}>
          Avpublicera</button>
          <button 
          onClick={() => setChangeForm(true)}>Redigera</button>
          </ButtonContainer>
          </>}
          {item.studentsAssigned < 5 && <>
            <p>Planerad start:{item.startDate}</p>
              <h3>Ej publicerad kurs</h3>
              <p>Antal deltagare anmälda hittills: {item.studentsAssigned}</p>
              <p>Minimum deltagare: 5</p>
              <p>Antal deltagare kvar som behövs för att kunna ha kursen: {5-item.studentsAssigned} </p>
              <button 
              onClick={() => setChangeForm(true)}>Ändra</button>
          </>}
          {!item.published && item.studentsAssigned >= 5 ? <> <p>Start:{item.startDate}</p>
                  <h3>Ej publicerad kurs</h3>
                  <p>Minimum deltagare: 5 <br /> Antal deltagare anmälda hittills: {item.studentsAssigned}</p>
                  <p>Det går att publicera kursen:</p>
                  <ButtonContainer>
                  <button  
                  onClick={setToPublished}>Publicera</button>
                  <button 
                  onClick={() => setChangeForm(true)}>Ändra</button>
                  </ButtonContainer>
                  
          </>: null}
         
          </div>
        ))
        }
       
        </InfoRuta>
        
  </Section> );
}
 
export default Kurs;