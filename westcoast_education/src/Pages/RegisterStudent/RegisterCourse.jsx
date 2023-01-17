import { useState, useRef, useContext, useEffect } from "react";
import { useFetch } from "../../Components/utils/useFetch";
import StudentContext from "../../Context/StudentContext";
import styled from "styled-components";
import { FormWOInstructions as Form } from "../../Components/StylingElements/Form/Form";
import Button from "../../Components/StylingElements/Buttons/FormButton";
import Modal from "../../Components/ui/Modal/Modal";

const Section = styled.section`
padding:3rem;
display: flex;
flex-direction:column;
align-items:center;
width:100%;
justify-content:center;`


const Registrering = (props) => {
  const context = useContext(StudentContext);
  const [showModal, setShowModal] = useState(false)
  const [validInputs, setValidInputs] = useState(false)
  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const courseInputRef = useRef()
  const courseInputRef2 = useRef()
  const coursesURL = "http://localhost:8000/courses"
  const {data,loading,error} = useFetch(coursesURL)


const clearForm = () => {
  nameInputRef.current.value =""
  emailInputRef.current.value=""
  courseInputRef.current.value=""
  courseInputRef2.current.value=""
}

const onSubmit = async(e) => {
  e.preventDefault()
  clearForm()
}



  return ( 
  <Section data-testid="Registrering">

    <Form onSubmit={onSubmit}>
    <h1>Registrera dig på en kurs</h1>
      <label htmlFor="studentName">
        Ditt namn:
      </label>
      <input id="studentName"
      ref={nameInputRef}
      name="studentName"
      placeholder={context.studentName || "Namn"} 
      type="text"
      required/>
      <label htmlFor="studentEmail">
        Email:
      </label>
      <input id="studentEmail"
      data-testid="studentEmail"
      ref={emailInputRef}
      name="studentEmail"
      placeholder={context.studentEmail || "Email"}
      type="email"
      required/>
      <label htmlFor="firstChoice">
        Kursval 1:</label>
      <select id="firstChoice"
      data-testid="studentcours1"
      ref={courseInputRef}
      required
      onChange={() => setValidInputs(true)}
      >
        <option value={props.name ||"Välj:"} 
        data-testid="optionDefault"
        label={props.name ||"Välj:"}/>
        {data && data.filter(function (course){return course.courseName !== props.name}).map(item => ( <option key={item.courseID}>{item.courseName}</option>)
        )}
      </select>
      
      <label htmlFor="secondChoice">
        **Kursval 2:</label>
      <select id="secondChoice" 
      ref={courseInputRef2}
      data-testid="studentcourse2"
      >
      <option value="Välj:" 
        name="Välj:"
        label="Välj:"/>
        {data && data.filter(function (course){return course.courseName !== props.name}).map(item => ( <option key={item.courseID}>{item.courseName}</option>)
        )}
        <option 
        value="Ingen"
        data-testid="IngetVal"
        name="Ingen"
        label="Ingen"/>
      </select>
      <Button 
      className={validInputs ? "enabled" :""}
      type="submit"
      value="Skicka"
      />
    </Form>
  
  <p>** Detta är inte obligatoriskt för att du ska kunna anmäla dig, men det kan vara bra att ha en back-up.</p>
  <h3>Bra att veta:</h3>
  <p>När du har bokat en kurs så kommer vi skicka ett bekräftelsemejl med
      betalningsuppgifter och ett välkomstmeddelande. 
      Skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste
      vi tyvärr av ekonomiska skäl boka av kursen. </p>
      
  </Section> );
}
 
export default Registrering ;