
import styled from "styled-components";
import { useCourses } from "../ContextAPI/contextAPI";

const ListWithCourses = styled.div`
display:grid;
list-style:none;
gap: 1rem;
@media (min-width: 700px) {
grid-template-columns: repeat(2, 1fr);
}
@media (min-width: 1000px) {
  grid-template-columns: repeat(3, 1fr);
  }
@media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    }
li{
  background-color:${({ theme }) => theme.buttonBackground};
  color:${({ theme }) => theme.buttonText};
  padding:2rem;
}
padding-bottom:1rem;
`
const Date = styled.p`
color:${({ theme }) => theme.accent}`

const Info = styled.div`
h2{
  font-size:32px;
  font-family: Sofia Sans;
}
p:last-of-type{
  padding-right:2rem;
}`

const AllaKurser = () => {
 
const {courses} = useCourses()
console.log(courses)
  return ( 
  <Info data-testid="allCourses">
    <h2>2023</h2>
    <p>Här följer kurser vi erbjuder under 2023. Denna lista kan komma att uppdateras under början på året.</p>
    
      <ListWithCourses>
        {courses.map(c => (
          <li key={c.courseID}>
            <h3>{c.courseName}</h3>
            <p>{c.courseDescription}</p>
            <Date>Startdatum: {c.startDate.substring(5).replace("-", "/")} </Date>
          <p>Anmäl dig till kursen</p>
          </li>
        ))}
      </ListWithCourses>
      <p>När du har bokat en kurs så kommer vi skicka ett bekräftelsemejl med
      betalningsuppgifter och ett välkomstmeddelande. 
      Skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste
      vi tyvärr av ekonomiska skäl boka av kursen. </p>
    
  </Info> );
}

export default AllaKurser;