import {Line} from "../../Components/StylingElements/Line/Line"
import { Link } from "react-router-dom";
import { useState} from "react";
import { useFirebase } from "../../Components/utils/useFirebase";
import {Intro, TwoColumns, Column, About, Grid} from "./HomepageStyles.jsx"

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
  <About >
  <h2>Våra kurser {year}</h2>
  {loading && <div>Laddar..</div>}
    {data && 
  <Grid id="kurser">
    {data.filter(function (course){ 
      return course.published === true}).map(function (course){
    return (
      <div
      key={course.courseID}>
        <h3>{course.courseName}</h3>
        
        <p>{course.courseDescription}</p>
        <p>Startdatum: {course.startDate}</p>
        <Link
        to={`/student/student-kurser/register/${course.courseID}`}><button >Anmäl dig till kursen här</button></Link>
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