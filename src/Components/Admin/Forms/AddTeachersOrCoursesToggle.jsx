import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Form = styled.div``

const AddTeacherOrCourseToggle = () => {
  const [msg, setMsg] = useState("Välj")
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
       setMsg("Bra om du väljer något")
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
      label={msg}/>
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