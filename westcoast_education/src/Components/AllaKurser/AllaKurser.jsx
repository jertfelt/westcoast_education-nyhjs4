import { useEffect, useState } from "react";
import styled from "styled-components";

const ListWithCourses = styled.div`
display:grid;
list-style:none;
gap: 1rem;
max-width: 1200px;
@media (min-width: 700px) {
  padding-left:3rem;
grid-template-columns: repeat(2, 1fr);
}
li{
  background-color:${({ theme }) => theme.buttonBackground};
  color:${({ theme }) => theme.buttonText};
  padding:1rem;
}
`
const Date = styled.p`
color:${({ theme }) => theme.accent}`

const AllaKurser = () => {
  const [courses, setCourses] = useState([])
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/teachers")
    .then((response) => response.json())
    .then((data) => setTeachers(data))
  }, [])

  useEffect(() => {
    fetch("http://localhost:8000/courses")
    .then((response) => response.json())
    .then((data) => setCourses(data))
  }, [])

  
  return ( 
  <div data-testid="allCourses">
    <h2>Kurser 2023</h2>
    <p>Här följer kurser vi erbjuder under 2023. Denna lista kan komma att uppdateras under början på året.</p>
    
      <ListWithCourses>
        {courses.map(course => (
          <li key={course.courseID}>
            <h3>{course.courseName}</h3>
            <p>{course.courseDescription}</p>
            <Date>Startdatum: {course.startDate.substring(5).replace("-", "/")} </Date>
          </li>
        ))}
      </ListWithCourses>
    
  </div> );
}

export default AllaKurser;