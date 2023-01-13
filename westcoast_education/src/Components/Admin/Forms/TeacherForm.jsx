import styled from "styled-components";
import CompetenceList from "./CompetenceCheckboxes";
import { useRef } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

const Form = styled.form``


const TeacherForm = () => {
  const firstNameInputRef = useRef()
  const lastNameInputRef = useRef()
  const personalIDInputRef = useRef()
  const emailInputRef = useRef()
  const mobileNoInputRef = useRef()
  const competencelistRef = useRef()

  const clearForm = () => {
    firstNameInputRef.current.value = ""
    lastNameInputRef.current.value = ""
    personalIDInputRef.current.value = ""
    emailInputRef.current.value =""
    mobileNoInputRef.current.value =""
    competencelistRef.current.value = ""
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const personalID = personalIDInputRef.current.value;
    const email = emailInputRef.current.value;
    const mobileNo = mobileNoInputRef.current.value;
    const competences =  competencelistRef.current.value; 

    const teacher = {
      firstName,
      lastName,
      personalID,
      email,
      mobileNo,
      competences
    }
    clearForm()
  }

  return ( 
    <Form onSubmit={onSubmit}>
      <label htmlFor="firstName">Förnamn/Tilltalsnamn:</label>
      <input id="firstName"
      ref={firstNameInputRef}
      name="firstName"
      placeholder="Arnold"
      type="text"/>
      <label htmlFor="lastName">Efternamn:</label>
      <input id="lastName" 
      ref={lastNameInputRef}
      name="lastName"
      placeholder="Jertfelt"
      type="text"/>
      <label htmlFor="personalID">Personnummer:</label>
      <input id="personalID"
      placeholder="0000000"
      ref={personalIDInputRef}
      name="personalID"
      type="number"
      min="10"
      max="12"/>
      <label htmlFor="email">Email:</label>
      <input id="email"
      ref={emailInputRef}
      placeholder="admin@westcoast.com"
      name="email"
      type="email"/>
      <label htmlFor="mobileNo">Mobil:</label>
      <input id="mobileNo"
      ref={mobileNoInputRef}
      name="mobileNo"
      type="tel"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      placeholder="070000000"/>
      <CompetenceList 
      ref={competencelistRef}/>
      <input type="submit"></input>
    </Form>
    );
}
 
export default TeacherForm;