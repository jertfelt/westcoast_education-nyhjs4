import { Grid, GoodToKnow } from "../../Pages/Startsida/HomepageStyles"
import { Link } from "react-router-dom"

const HomePageCourses = ({year, courseList}) => {
  return (<>
  <h2>Våra kurser {year}</h2>
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
    <h2>Dessa kurser är ännu inte bekräftade:</h2>
    <p>Dessa kurser har ännu inte fullt antal anmälda. Men du kan fortfarande anmäla dig till dem!</p>
    </GoodToKnow>
  <Grid id="opublicerade">
  {courseList.filter(function (course){ 
      return course.published !== true}).map(function (course){
    return (
      <div
      key={course.courseID}>
        <h3>{course.courseName}</h3>
        <p>{course.courseDescription}</p>
        <p>Antal studenter anmälda: {course.studentsAssigned}/5</p>
        <p>5 studenter behövs för att kursen ska bli publicerad. Anmäl dig idag om du är intresserad!</p>
        <p>Startdatum: {course.startDate}</p>
        <Link
        to={`/student/student-kurser/register/${course.courseName}`}>
        <button >Anmäl dig till kursen här</button></Link>
      </div>
    )
  })}
  </Grid>
  </>
 );
}
 
export default HomePageCourses;