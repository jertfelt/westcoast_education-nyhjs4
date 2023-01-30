import { Link } from "react-router-dom";
// //*context
import { useContext } from "react";
import AuthContext from "../../Context/Auth.Context";
import StudentContext from "../../Context/StudentContext";
import LogOut from "../Admin/LoginLogOut/Logout";
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
      <LogOut/>
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
          Logga ut student</button>
        </li> 
    </>
    }</>)
    }
    </>
  );
}

export default LinksInFooter;