import { Link } from "react-router-dom";
import { Courses } from "../../StylingElements/SectionsAdmin/AdminComponents";



const KursInList = ({courses}) => {
  return (<Courses>
    <Link 
    to={`/kurser/${courses.courseID}`}>
      <h3 
      data-testid="kurstest">
      {courses.courseName}</h3>
      {courses.published ? (<>
        <p><strong>Publicerad</strong></p>
        <p>Start: {courses.startDate}</p>
        <p>Antal studenter: {courses.studentsAssigned}</p>
      </>
      ):(<>
      <p><strong>Ej publicerad</strong></p>
      </>)}
    </Link>
  </Courses>  );
}
 
export default KursInList;

export const KursPublishedOnly = ({courses}) => {
  return(
  <Courses>
    <Link 
    to={`/kurser/${courses.courseID}`}>
    <h3 
    data-testid="kurstest">
      {courses.courseName}</h3>
    <p>Start: {courses.startDate}</p>
    <p>Anmälda: {courses.studentsAssigned}</p>
    </Link>
  </Courses>
  )
}

export const KursNotPublishedOnly = ({courses}) => {
   <Courses >
    <Link 
    to={`/kurser/${courses.courseID}`}>
    <h3 data-testid="kurstest">
      {courses.courseName}</h3>
    <p><strong>Ej publicerad</strong></p>
    <p>Anmälda: {courses.studentsAssigned}</p>
    </Link>
  </Courses>
}