import { useState } from "react";
import styled from "styled-components";
import TeacherForm from "./TeacherForm";

const Form = styled.div``
const Select = styled.select``
const CourseForm = styled.form``


const AddTeacherOrCourseForm = () => {
  const [teacher, setTeacher] = useState(false)
  const [course, setCourse] = useState(false)

  const chooseYourForm = (e) => {
    switch(e.target.value){
      case "teacher":
        setTeacher(true)
        break;
      case "course":
        setCourse(true)
        break;
      default:
        setTeacher(false)
        setCourse(false)
    }
  }

  return ( 
  <Form>
    <h2>Lägg till kurs/lärare:</h2>
    <label htmlFor="chooseForm">Välj:</label>
    <Select id="chooseForm" 
    onChange={chooseYourForm}
    > 
    <option value="" 
    label=""></option>
      <option value="teacher" 
      label="Lärare">Lärare</option>
      <option value="course" 
      label="Kurs">Kurs</option>
    </Select>
    {teacher && <TeacherForm/>}
    {course && <CourseForm/>}
  </Form>  );
}
 
export default AddTeacherOrCourseForm;