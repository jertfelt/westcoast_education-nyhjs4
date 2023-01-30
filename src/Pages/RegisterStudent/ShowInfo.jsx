const ShowInfo = ({courses}) => {
  return ( 
    <div>
      <p>Start: {courses.startDate} <br/>
      {!courses.published && courses.studentsAssigned <5 &&         
      <>Just nu: {courses.studentsAssigned}/5 studenter<br/></>
      }
      Längd i veckor: {courses.lengthWeeks} <br/>
      Lärare: {courses.teacherAssigned}</p>
    </div>
   );
}
 
export default ShowInfo;