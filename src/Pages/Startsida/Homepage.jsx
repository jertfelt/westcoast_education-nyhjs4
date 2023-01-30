import {Line} from "../../Components/StylingElements/Line/Line"
import { Link } from "react-router-dom";
import {Intro, TwoColumns, Column, About, Grid, GoodToKnow, Images, Reviews} from "./HomepageStyles.jsx"
import ReviewsComp from "../../Components/HomePageComponents/Reviews";
import HomePageCourses from "../../Components/HomePageComponents/HomePageCourses";

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
      Vårt koncept har och är fortfarande att tillhandahålla klassrums utbildningar där elever och lärare möts. Vi erbjuder även distansutbildning där elever kan närvara via länk till klassrum där en lärare genomför lektionen.
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
 <ReviewsComp/>
 <Line/>
 {!courses && <h3>Laddar..</h3>}
 {courses &&
  <HomePageCourses 
  year={year}
  courseList={courseList}/>}


  </About>
  </section> );
}
export default HomePage;