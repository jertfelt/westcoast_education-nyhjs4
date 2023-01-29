import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Form = styled.div``

const AddTeacherOrCourseToggle = () => {

  const navigate = useNavigate()
  const chooseYourForm = (e) => {
    switch(e.target.value){
      case "teacher":
      navigate("/larare/new")
        break;
      case "course":
      navigate("/kurser/new")
        break;
      default:
       console.log("not chosen")
    }
  }

  return ( 
  <Form>
   
  
    <label htmlFor="chooseForm"> <h3>Lägg till kurs/lärare:</h3></label>
    <select id="chooseForm" 
    onChange={chooseYourForm}
    > 
      <option 
      value="" 
      label="Välj:"/>
      <option 
      value="teacher" 
      label="Lärare">Lärare</option>
      <option 
      value="course" 
      label="Kurs">Kurs</option>
    </select>
  
  </Form>  );
}
 
export default AddTeacherOrCourseToggle;