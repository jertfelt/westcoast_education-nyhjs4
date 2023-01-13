import styled from "styled-components";
import CompetenceList from "./CompetenceCheckboxes";
import { useRef, useEffect, useCallback, useState } from "react";
import axios from "axios";
import Modal from "../../ui/Modal/Modal";

const Form = styled.form``
const Button = styled.input``

const CheckBox = ({competence, isChecked, onAddCompetence, onRemoveCompetence}) => (
  <div key = {competence.competenceID}>
  <input 
        type="checkbox"
        id={`kompetens ${competence.competenceID}`}
        checked={isChecked}
        onChange={isChecked ? onAddCompetence : onRemoveCompetence}
        name={`kompetens ${competence.competenceID}`}
        value={competence.competence}/>
        <label 
        htmlFor={`kompetens ${competence.competenceID}`}>
          {competence.competence}
        </label>
  </div>
)

const TeacherForm = () => {
  const [competences, setCompetences] = useState([])
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modifiedData, setModifiedData] = useState({competences: [], description: '', name: ''})
  const firstNameInputRef = useRef()
  const lastNameInputRef = useRef()
  const personalIDInputRef = useRef()
  const emailInputRef = useRef()
  const mobileNoInputRef = useRef()
  const competenceURL = "http://localhost:8000/competences"
  const teacherURL = "http://localhost:8000/teachers"

  // const handleChangeCheckbox = useCallback(({target: {name, value}}) => {
  //   setModifiedData(prevData => ({...prevData, [name]: value}))
  // }, [])

  const clearForm = () => {
    firstNameInputRef.current.value = ""
    lastNameInputRef.current.value = ""
    personalIDInputRef.current.value = ""
    emailInputRef.current.value =""
    mobileNoInputRef.current.value =""
   
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const personalID = personalIDInputRef.current.value;
    const email = emailInputRef.current.value;
    const mobileNo = mobileNoInputRef.current.value;
    

    const teacher = {
      firstName,
      lastName,
      personalID,
      email,
      mobileNo,
      modifiedData
    }
    
    await axios 
    .post(teacherURL, teacher)
    .then(res => {
      console.log(res, "response from axios post")
    })
    .catch(error => {
      setError(error)
    })
    clearForm()
  }

 
   if(error){
    setShowModal(true)
   }

   useEffect(() => {
    fetch(competenceURL)
    .then(res => res.json())
    .then(data => setCompetences(data))
   }, [])

  return ( 
    <Form onSubmit={onSubmit}>
      <label htmlFor="firstName">
        Förnamn/Tilltalsnamn:</label>
      <input id="firstName"
      ref={firstNameInputRef}
      name="firstName"
      placeholder="Arnold"
      type="text"/>
      <label htmlFor="lastName">
        Efternamn:</label>
      <input id="lastName" 
      ref={lastNameInputRef}
      name="lastName"
      placeholder="Jertfelt"
      type="text"/>
      <label htmlFor="personalID">
        Personnummer:</label>
      <input id="personalID"
      placeholder="0000000"
      ref={personalIDInputRef}
      name="personalID"
      type="number"
      min="10"
      max="12"/>
      <label htmlFor="email">
        Email:</label>
      <input id="email"
      ref={emailInputRef}
      placeholder="admin@westcoast.com"
      name="email"
      type="email"/>
      <label htmlFor="mobileNo">
        Mobil:</label>
      <input id="mobileNo"
      ref={mobileNoInputRef}
      name="mobileNo"
      type="tel"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      placeholder="070000000"/>
      <div>
      <p>Välj en eller flera kompetenser:</p>
      {competences.map(competence => (
        <CheckBox
        competence={competence}
              isChecked={modifiedData.competences.includes(competence.competenceID)}
              onAddCategory={() =>
                setModifiedData((prevData) => ({
                  ...prevData,
                  competences: [...prevData.competences, competence.competenceID],
                }))
              }
              onRemoveCategory={() =>
                setModifiedData((prevData) => ({
                  ...prevData,
                  categories: prevData.competences.filter(
                    (id) => id !== competence.competenceID
                  ),
                }))
              }
            />
      ))}
      </div>
      <Button
      type="submit" 
      value="Lägg till lärare"/>
    </Form>
    );
}
 
export default TeacherForm;