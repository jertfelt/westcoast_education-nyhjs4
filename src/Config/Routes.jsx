import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/Auth.Context";
import StudentContext from "../Context/StudentContext";

//? PUBLIC PAGES
import HomePage from "../Pages/Startsida/Homepage";
import NoMatch from "../Pages/NoMatch/NoMatch";

//? ADMIN ROUTES 
import Login from "../Components/Admin/LoginLogOut/AdminLogin";
import Admin from "../Pages/AdminSite/Admin";

import AllaKurser from "../Components/Admin/Kurs/AllaKurser";
import Kurs from "../Components/Admin/Kurs/Kurs";
import AllTeachers from "../Components/Admin/AllTeachers/AllTeachers";
import Teacher from "../Components/Admin/AllTeachers/Teacher"

//? STUDENT ROUTES
import RegisterKurs from "../Components/RegisterKursParam/RegisterKursParam";
import RegistreringKurs from "../Pages/RegisterStudent/RegisterCourse";
import StudentPortal from "../Pages/StudentPortal/StudentPortal"

import LoginStudent from "../Pages/LoginStudent/LoginStudent";

const Routing = () => {
  const contextAdmin = useContext(AuthContext)
  const contextStudent = useContext(StudentContext)
  const isAdminLoggedIn = contextAdmin.loggedIn
  const isStudentLoggedIn = contextStudent.studentLoggedIn


  return (   
  <Routes>
    <Route path="/" 
    element={<HomePage/>}/>

    <Route path="/admin/login"
    element={<Login/>}/>

    <Route path="/admin" 
    element={isAdminLoggedIn ? <Admin />:<Navigate to="/admin/login"/>}/>

    <Route path="/student/login" 
    element={<LoginStudent/>}/> 

    <Route path="/student" 
    element={isStudentLoggedIn ? <StudentPortal/>: <Navigate to="/student/login"/>}/>

    <Route path="/student/student-kurser/register">
      <Route index element={isStudentLoggedIn ? <RegistreringKurs/>: <Navigate to="/student/login"/>}/> 
      <Route path=":id" element={isStudentLoggedIn ? <RegisterKurs/>: <Navigate to="/student/login"/>}/>
    </Route> 

    <Route path="/kurser">
      <Route index element={isAdminLoggedIn ?<Admin/>:<Navigate to="/admin/login"/>}/>
      <Route path=":id" element={isAdminLoggedIn ?<Kurs/>:<Navigate to="/admin/login"/>}/>
    </Route>

    <Route path="/larare">
      <Route index element={isAdminLoggedIn ?<Admin/>:<Navigate to="/admin/login"/>}/>
      <Route path=":id" element={isAdminLoggedIn ?<Teacher/>:<Navigate to="/admin/login"/>}/>
    </Route>

    <Route path="*" element={<NoMatch/>}/>
  </Routes>
   );
}
 
export default Routing;