import {Line} from "../../Components/StylingElements/Line/Line"
import { Link } from "react-router-dom";
import {Intro, TwoColumns, Column, About, Grid, GoodToKnow, Images, Reviews} from "./HomepageStyles.jsx"

const HomePage = ({courses, studentsDb}) => {
  const year = new Date().getFullYear();
 
  const courseList = courses;
  
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
  <Images>
 <img src="https://files.builder.misssite.com/d4/00/d400b081-d445-4bc5-8170-d2b5b7448058.jpg"
          alt="Glad kille i telefonsamtal"/>
    <img src="https://files.builder.misssite.com/1a/e3/1ae30306-563d-41ab-b876-b5ac6660782d.png"
    alt="Glad äldre kvinna med en padda"/>
 </Images>
 <h2>Våra studenters omdömen:</h2>
 <Reviews>
    <div>
      <h3>Jose Ruejas</h3>
      <Line/>
      <p>Man får snabba svar på sina uppgifter och bra reflektioner att ta med sig vidare. Föreläsningarna har varit mycket bra och givande.</p>
    </div>
    <div>
    <h3>Mark McCliff</h3>
    <Line/>
      <p>Bra utbildning med professionell kursledare, lärt mig jättemycket angående ämnet. </p>
    </div>
    <div>
    <h3>Rut Katrinsson</h3>
    <Line/>
      <p>Man behövde bara komma in i hur upplägget var.</p>
    </div>
    <div>
    <h3>Samuel Badat</h3>
    <Line/>
      <p>Det bästa med utbildningen var föreläsningarna och att man kunde lyssna och inte läsa så mycket. Att det var en blandning mellan uppgifter, föreläsningar och inlämningsuppgifter, det var väldigt bra.</p>
    </div>
    <div>
    <h3>Kajsa Gustafsson</h3>
    <Line/>
      <p>Att man fick hjälp och svar på det man behövde snabbt var toppen!</p>
    </div>
    <div>
    <h3>Michael Qvarnström</h3>
    <Line/>
      <p>Jag tycker faktiskt att den var superbra anpassad för de som arbetar och samtidigt vill plugga vid sidan om</p>
    </div>
    
 </Reviews>
 <Line/>
  <h2>Våra kurser {year}</h2>
  {!courses && <h3>Laddar..</h3>}
    {courses &&  <>
  <Grid id="kurser">
    {courseList.filter(function (course){ 
      return course.published === true}).map(function (course){
    return (
      <div
      key={course.courseID}>
        <h3>{course.courseName}</h3>
        <p>{course.courseDescription}</p>
        <p>Startdatum: {course.startDate}</p>
        <Link
        to={`/student/student-kurser/register/${course.courseName}`}><button >Anmäl dig till kursen här</button></Link>
      </div>
    )})}
  </Grid>
  <GoodToKnow>
    <h3>Dessa kurser är ännu inte publicerade:</h3></GoodToKnow>
  <Grid id="opublicerade">
   
   {courseList.filter(function (course){ 
      return course.published !== true}).map(function (course){
    return (
      <div
      key={course.courseID}>
        <h3>{course.courseName}</h3>
        <p>Antal studenter anmälda: {course.studentsAssigned}/5</p>
        <p>5 studenter behövs för att kursen ska bli publicerad. Anmäl dig idag om du är intresserad!</p>
        <p>{course.courseDescription}</p>
        <p>Startdatum: {course.startDate}</p>
        <Link
        to={`/student/student-kurser/register/${course.courseName}`}><button >Anmäl dig till kursen här</button></Link>
      </div>
    )
  })}

  </Grid>
  </>
}
  <GoodToKnow>

  <h3>Bra att veta:</h3>
  <p>När du har bokat en kurs så kommer vi skicka ett bekräftelsemejl med
      betalningsuppgifter och ett välkomstmeddelande. 
      Skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste
      vi tyvärr av ekonomiska skäl boka av kursen. </p>
  </GoodToKnow>

  </About>
  </section> );
}
export default HomePage;