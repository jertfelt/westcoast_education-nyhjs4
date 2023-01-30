import { Grid, GoodToKnow, TableCourses, TwoColumns } from "../../Pages/Startsida/HomepageStyles"
import { Link } from "react-router-dom"

const HomePageCourses = ({year, courseList}) => {
  return (
  <div id="kurser">
  <h2>Våra kurser {year}</h2>
  <TableCourses>
    <thead>
    <tr>
      <th>Kurs</th>
      <th>Beskrivning</th>
      <th>Startdatum</th>
      <th>Anmälan</th>
    </tr>
  </thead>
  <tbody>
  {courseList.filter(function (course){return course.published === true})
    .map(function (course){
      return (
      <tr
      key={course.courseID}>
        <td>{course.courseName}</td>
        <td>{course.courseDescription}</td>
        <td>Startdatum: {course.startDate}</td>
        <td>
        <Link
        to={`/student/student-kurser/register/${course.courseName}`}><button >Anmäl dig till kursen här</button></Link></td>
      </tr>
    )})}
  </tbody>
</TableCourses> 
  <Grid>
    {courseList.filter(function (course){return course.published === true})
    .map(function (course){
      return (
      <div className="mobile"
      key={course.courseID}>
        <h3>{course.courseName}</h3>
        <p>{course.courseDescription}</p>
        <p> {course.startDate}</p>
        <Link
        to={`/student/student-kurser/register/${course.courseName}`}><button >Anmäl dig till kursen här</button></Link>
      </div>
    )})}
  </Grid>
  <br/>
  <GoodToKnow>
  <TwoColumns>
    <p><h3>Kurserna nedan är inte bokade än:</h3>
    Dessa kurser har ännu inte fullt antal anmälda. Men du kan fortfarande anmäla dig till dem! 5 studenter behövs för att kursen ska bli publicerad. Anmäl dig idag om du är intresserad!</p>
  <p><h4>Bra att veta:</h4>
  När du har bokat en kurs så kommer vi skicka ett bekräftelsemejl med
      betalningsuppgifter och ett välkomstmeddelande. 
      Skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste vi tyvärr av ekonomiska skäl boka av kursen. </p>
  </TwoColumns>
  </GoodToKnow>
    <TableCourses>
    <thead>
    <tr>
      <th>Kurs</th>
      <th>Beskrivning</th>
      <th>Antal anmälda</th>
      <th>Startdatum</th>
      <th>Anmälan</th>
    </tr>
  </thead>
  <tbody>
  {courseList.filter(function (course){return course.published !== true})
    .map(function (course){
      return (
      <tr
        key={course.courseName}>
        <td>{course.courseName}</td>
        <td>{course.courseDescription}</td>
        <td>{course.studentsAssigned}/5</td>
        <td>{course.startDate}</td>
        <td>
          <Link
          to={`/student/student-kurser/register/${course.courseName}`}>
          <button>
          Anmäl dig till kursen här
          </button></Link></td>
      </tr>
    )})}
  </tbody>
</TableCourses>
  <Grid id="opublicerade">
  {courseList.filter(function (course){ 
      return course.published !== true}).map(function (course){
    return (
      <div className="mobile"
      key={course.courseID}>
        <h3>{course.courseName}</h3>
        <p>{course.courseDescription}</p>
        <p>Antal studenter anmälda: {course.studentsAssigned}/5</p>
        <p>Startdatum: {course.startDate}</p>
        <Link
        to={`/student/student-kurser/register/${course.courseName}`}>
        <button >Anmäl dig till kursen här</button></Link>
      </div>
    )
  })}
  </Grid>

  </div>
 );
}
 
export default HomePageCourses;