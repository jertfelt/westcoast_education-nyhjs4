import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FormWOInstructions } from "../../StylingElements/Form/Form";

const Section = styled.section`
display: flex;
align-items:center;
min-height:80vh;
flex-direction:column-reverse;
justify-content:center;
`

const InfoRuta = styled.div`
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
max-width:500px;
padding:2rem;
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
  const COURSES_URL = "http://localhost:8000/courses"
  const {data, error, loading} = useFetch(COURSES_URL)
  const [changeForm, setChangeForm] = useState(false);
  const [year, setYear] = useState("")
  const [nextYear, setNextYear] = useState("")

  const courseNameRef = useRef()
  const courseDescriptionRef = useRef()
  const startDateref = useRef()
  const lengthWeeksRef =  useRef()
  const studentsAssignedRef = useRef()


  useEffect(() => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today =  yyyy + '-' + mm + '-' + dd;
setYear(today)
    let nyyy = new Date().getFullYear() +1
    let nextyearToday = String(nyyy) + "-" + mm + "-" + dd;
setNextYear(nextyearToday)
  }, [])


  const setToPublished = (e) => {
    e.preventDefault()
  }
  const changeCourse = (e) => {
  e.preventDefault()
  
  }

  return ( 
  <Section>
    {error && <p>Något har blivit fel med servern</p>}
    <InfoRuta>
    {changeForm && 
        <FormWOInstructions onSubmit={changeCourse}>
          <h2>Ändra:</h2>
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
          min={year}
          max={nextYear}
          ref={startDateref}
          />
           <label htmlFor="lengthWeeksChangeInput">Antal veckor:</label>
          <input 
          id="lengthWeeksChangeInput"
          type="number"
          min={2}
          max={15}
          ref={lengthWeeksRef}
          />
           <label htmlFor="studentsAssignedChangeInput">Antal studenter:</label>
           {data && data.map((item => {
      if(item.courseID === noId){ return(
        <input 
        key={item.courseID}
        id="studentsAssignedChangeInput"
        type="number"
        value={item.studentsAssigned}
        ref={studentsAssignedRef}
        />
      )}}))}
      <input type="submit"
      value="Ändra"/>
          </FormWOInstructions>}
    {data && data.map((item => {
      if(item.courseID === noId){
        return (
          <div key= {item.id}>
                <h1>{item.courseName}</h1>
                <p>Beskrivning: {item.courseDescription}</p>
          {item.published && <>
          
              <p>Start:{item.startDate}</p>
              <p>Längd: {item.lengthWeeks} veckor</p>  
              <p>Publicerad kurs</p>
              <p>Antal deltagare anmälda: {item.studentsAssigned}</p>
              <ButtonContainer>
              <button onClick={setToPublished}>Avpublicera</button>
              <button 
              onClick={() => setChangeForm(true)}>Ändra</button>
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
        )
        }
        }))}
        </InfoRuta>
        
  </Section> );
}
 
export default Kurs;