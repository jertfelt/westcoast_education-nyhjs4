import styled from "styled-components";
import {Line} from "../../Components/StylingElements/Line/Line"
import { Link } from "react-router-dom";
import { useState} from "react";
import { useFirebase } from "../../Components/utils/useFirebase";

const Intro = styled.div`
min-height:50vh;
color: ${({ theme }) => theme.text};
padding:2rem;
display:flex;
flex-direction:column;
align-items:center;
img{
  max-width:100%;
}
@media screen and (max-width: 700px) {
  padding:1rem;}
h1{
  font-size:2em;
  @media screen and (max-width: 992px) {
    line-height:2rem;
  }
}
h3{
  color: ${({ theme }) => theme.accent};
}
`
const TwoColumns = styled.div`
display:flex;
flex-direction: row;
gap: 2rem;
margin-top:1rem;
@media screen and (max-width: 700px) {
flex-direction:column;
gap:0.3rem;}
`

const Column = styled.div`
max-width:50%;

@media screen and (max-width: 700px) {
  max-width:80%;}
`


const About = styled.div`
padding:2rem;
@media screen and (max-width: 700px) {
  padding:1rem;}
`

const Grid = styled.div`
display:grid;
max-width: 1200px;
margin: 0 auto;
gap: 1rem;
div{
  background: ${({ theme }) => theme.accent};
  padding:2rem;
  color: ${({ theme }) => theme.buttonText};
  a{
    color:${({ theme }) => theme.buttonText};
    padding-right:6px;
  }
  h3{
    font-size:30px;
    margin-top:1rem;
  }
  p{
    max-width:80%;
  }
}
@media (min-width:800px){
  grid-template-columns: repeat(2, 1fr);
}
button{
  padding:8px;
  border:none;
}
`

const HomePage = () => {
  
  const year = useState(new Date().getFullYear())
  const {data,loading,error} = useFirebase("/courses")
  
  if(error){
    console.log(error)
  }
  return ( 
  <section data-testid="homepage">
  <Intro>
    <h1>Välkommen till ditt studieliv!</h1>
    <img src="https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg"
    alt="Education @ Westcoast"
    ></img>
    <TwoColumns data-testid="responsive">
      <Column>
      <h3>Vi har varit i utbildningsbranschen i snart 40 år.</h3>
      <p>
      <strong>WestCoast Education </strong> är ett utbildningsföretag som har sin placering på västkusten strax norr om Göteborg. 
      Vårt affärsmål är och har varit att tillhandahålla tekniska utbildningar inom IT-området.
      Vi har varit väldigt framgångsrika i alla år. 
        </p>
      </Column>
      <Column>
      <p>
      Vi har specialiserat oss på framförallt
      systemutvecklingsutbildningar inom webb och mobila lösningar.
      Vårt koncept har och är fortfarande att tillhandahålla klassrums utbildningar där elever och
      lärare möts. Vi erbjuder även distansutbildning där elever kan närvara via länk till klassrum
      där en lärare genomför lektionen.
        </p>
      </Column>
    </TwoColumns>
   </Intro>
  <Line/>
  <About>
  <h2>Våra kurser {year}</h2>
  {loading && <div>Laddar..</div>}
    {data && 
  <Grid>
    {data.filter(function (course){ return course.published === true}).map(function (course){
    return (
      <div
      key={course.courseID}>
        <h3>{course.courseName}</h3>
        <p>{course.courseDescription}</p>
        <p>Startdatum: {course.startDate}</p>
        <Link 
        to={`/kurser/${course.courseName}`}>
          Läs mer här </Link>
        <Link
        to={`/register/${course.courseName}`}><button >Anmäl dig till kursen här</button></Link>
      </div>
    )
  })}

  </Grid>
}
  
  <h3>Bra att veta:</h3>
  <p>När du har bokat en kurs så kommer vi skicka ett bekräftelsemejl med
      betalningsuppgifter och ett välkomstmeddelande. 
      Skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste
      vi tyvärr av ekonomiska skäl boka av kursen. </p>
  </About>
  </section> );
}
export default HomePage;