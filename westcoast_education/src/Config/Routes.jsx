import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/Startsida/Homepage";
import Login from "../Components/LoginLogOut/Login";
import AdminSite from "../Pages/AdminSite/AdminSite";
import Registrering from "../Pages/RegisterStudent/Registrering";
import NoMatch from "../Pages/NoMatch/NoMatch";
import Kurs from "../Components/Admin/Kurs/Kurs"
import AllTeachers from "../Components/Admin/AllTeachers/AllTeachers"
import Teacher from "../Components/Admin/AllTeachers/Teacher"
import AllaKurser from "../Components/Admin/Kurs/AllaKurser"
import RegisterKurs from "../Components/Register/RegisterKurs"
import StudentPortal from "../Pages/StudentPortal/StudentPortal"
import LoginStudent from "../Components/Student/LoginStudent";
import { useContext } from "react";
import AuthContext from "../Context/Auth.Context";
import StudentContext from "../Context/StudentContext";


const Routing = () => {
  const contextAdmin = useContext(AuthContext)
  const contextStudent = useContext(StudentContext)
  const isAdminLoggedIn = contextAdmin.loggedIn
  const isStudentLoggedIn = contextStudent.studentLoggedIn

  return (   <Routes>
    <Route path="/" 
    element={<HomePage/>}/>
    <Route path="/login"
    element={<Login/>}/>
    <Route path="/admin" 
    element={isAdminLoggedIn ? <AdminSite/>:<Navigate to="/login"/>}/>
    <Route path="/studentlogin" 
    element={<LoginStudent/>}/>
    <Route path="/student" 
    element={isStudentLoggedIn ? <StudentPortal/>: <Navigate to="/studentlogin"/>}/>
    <Route path="/register">
      <Route index element={isStudentLoggedIn ? <Registrering/>: <Navigate to="/studentlogin"/>}/>
      <Route path=":id" element={isStudentLoggedIn ? <RegisterKurs/>: <Navigate to="/studentlogin"/>}/>
    </Route>
    <Route path="/kurser">
      <Route index element={isAdminLoggedIn ?<AllaKurser/>:<Navigate to="/login"/>}/>
      <Route path=":id" element={isAdminLoggedIn ?<Kurs/>:<Navigate to="/login"/>}/>
    </Route>
    <Route path="/larare">
      <Route index element={isAdminLoggedIn ?<AllTeachers/>:<Navigate to="/login"/>}/>
      <Route path=":id" element={isAdminLoggedIn ?<Teacher/>:<Navigate to="/login"/>}/>
    </Route>
    <Route path="*" element={<NoMatch/>}/>
  </Routes>
   );
}
 
export default Routing;