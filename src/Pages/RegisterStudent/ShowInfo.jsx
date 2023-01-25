const ShowInfo = ({courses}) => {
  return ( 
    <div>
      <h4>{courses.courseName}</h4>
      
      <p>Start: {courses.startDate} </p>
      {!courses.published && courses.studentsAssigned <5 && 
              
    <p>Just nu: {courses.studentsAssigned}/5 studenter</p>
                }
    <p>Längd i veckor: {courses.lengthWeeks} </p>
    <p>Lärare: {courses.teacherAssigned}</p>
     </div>
   );
}
 
export default ShowInfo;