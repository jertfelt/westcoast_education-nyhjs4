import { useContext } from "react";
import StudentContext from "../../Context/StudentContext";
import { Link } from "react-router-dom";

const StudentPortal = () => {
  const context = useContext(StudentContext)
  return ( 
  <section data-testid="studentportal">
    <h1>Välkommen, {context.studentName}</h1>
    <h2>Dina kurser:</h2>
    {/* <div>
      {context.studentCourses.map(item => ( 
        <p>{item.courses.firstChoice.subject}</p>
      ))}
    </div> */}
    <Link to="/register">Registrera kurs</Link>
    <button onClick={context.onLogout}>Logga ut</button>
  </section> );
}
 
export default StudentPortal;