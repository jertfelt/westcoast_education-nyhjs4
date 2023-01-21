import { Link } from "react-router-dom";
// //*context
import { useContext } from "react";
import AuthContext from "../../Context/Auth.Context";
import StudentContext from "../../Context/StudentContext";
const LinksInFooter = () => {
  const context = useContext(AuthContext)
  const contextStudent = useContext(StudentContext)

  return ( 
    <>
    {context.loggedIn ? (<>
      <li>
        <Link to="/admin">
          Admin</Link>
        </li>
      <li>
        <button onClick={context.onLogout}>
          Logga ut</button>
        </li>
    </>):(
      <>
      {contextStudent.studentLoggedIn && <>
      <li>
        <Link to="/student">
          Studentportal</Link>
      </li>
      <li>
        <button onClick={contextStudent.onLogout}>
          Logga ut</button>
        </li> 
    </>
    }</>)
    }
    </>
  );
}

export default LinksInFooter;