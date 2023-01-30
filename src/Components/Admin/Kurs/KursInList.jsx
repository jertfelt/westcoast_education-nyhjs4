import { Link } from "react-router-dom";
import { CourseTable, Courses } from "../../StylingElements/SectionsAdmin/AdminComponents";
import useDateconverter from "../../utils/useDateconverter";


// const KursInList = ({courses}) => {
//   return (<Courses>
//       <Link 
//     to={`/kurser/${courses.courseID}`}>
//     <CourseTable>
//       <thead>
//         <tr>
//           <th>
//             Namn:
//           </th>
//           <th>
//             Publicerad?
//           </th>
//           <th>
//             Start:
//           </th>
//           <th>
//             Antal studenter:
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>
//           {courses.courseName}
//           </td>
//           <td>
//           {courses.published ? "Ja" : "Nej"}
//           </td>
//           <td>
//           {courses.startDate}
//           </td>
//           <td>
//           {courses.studentsAssigned}
//           </td>
//         </tr>
//       </tbody>
//       </CourseTable>
//     </Link>
  
//   </Courses>  );
// }
  
//  export default KursInList;

// export const KursPublishedOnly = ({courses}) => {
//   return(
//   <Courses>
//     <Link 
//     to={`/kurser/${courses.courseID}`}>
//     <h3 
//     data-testid="kurstest">
//       {courses.courseName}</h3>
//     <p>Start: {courses.startDate}</p>
//     <p>Anmälda: {courses.studentsAssigned}</p>
//     </Link>
//   </Courses>
//   )
// }

// export const KursNotPublishedOnly = ({courses}) => {
//    <Courses >
//     <Link 
//     to={`/kurser/${courses.courseID}`}>
//     <h3 data-testid="kurstest">
//       {courses.courseName}</h3>
//     <p><strong>Ej publicerad</strong></p>
//     <p>Anmälda: {courses.studentsAssigned}</p>
//     </Link>
//   </Courses>
// } 

const KursInList = ({courses}) => {

  

  return (
  <Courses>
    <Link 
    to={`/kurser/${courses.courseID}`}>
      <h3 
      data-testid="kurstest">
      {courses.courseName}</h3>
      <CourseTable>
        <tbody>
        <tr>
          <th>Publicerad?</th>
          <td>{courses.published ? "JA" : "NEJ"}</td>
        </tr>
        <tr>
          <th>Start:</th>
          <td>{useDateconverter(courses.startDate)}</td>
        </tr>
        <tr>
          <th>Antal studenter:</th>
          <td>{courses.studentsAssigned}</td>
        </tr>
        </tbody>
      </CourseTable>
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


