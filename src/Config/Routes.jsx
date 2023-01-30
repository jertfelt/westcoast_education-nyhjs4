import { Routes, Route, Navigate } from "react-router-dom";
import { useContext} from "react";
import AuthContext from "../Context/Auth.Context";
import StudentContext from "../Context/StudentContext";

//? PUBLIC PAGES
import HomePage from "../Pages/Startsida/Homepage";
import NoMatch from "../Pages/NoMatch/NoMatch";

//? ADMIN ROUTES 
import Login from "../Components/Admin/LoginLogOut/AdminLogin";
import Admin from "../Pages/AdminSite/Admin";
//--Admin courses:
import AddKurs from "../Components/Admin/Kurs/AddKurs";
import Kurs from "../Components/Admin/Kurs/Kurs";
// --Admin teachers:
import AddNewTeacher from "../Components/Admin/AllTeachers/AddNewTeacher";
import Teacher from "../Components/Admin/AllTeachers/Teacher"

//? STUDENT ROUTES
import RegisterKurs from "../Components/RegisterKursParam/RegisterKursParam";
import RegistreringKurs from "../Pages/RegisterStudent/RegisterCourse";
import StudentPortal from "../Pages/StudentPortal/StudentPortal"
import LoginStudent from "../Pages/LoginStudent/LoginStudent";
import SignAdmin from "../Components/Admin/LoginLogOut/SignAdmin";
import { getAuth } from "firebase/auth";



const Routing = ({courses, students, teachers, competences}) => {
  const contextAdmin = useContext(AuthContext)
  const contextStudent = useContext(StudentContext)
  const isAdminLoggedIn = contextAdmin.loggedIn
  const isStudentLoggedIn = contextStudent.studentLoggedIn

  return (   
  <Routes>
    <Route path="/" 
    element={<HomePage 
    studentsDb = {students}
    courses = {courses}/>}
    />

    <Route path="/admin/login"
    element={!isAdminLoggedIn ?<Login/>: <Navigate to="/admin"/> }/>
    
    <Route path="/admin/register"
      element={!isAdminLoggedIn ? <SignAdmin/> : <Navigate to="/admin"/>}/>

    <Route path="/admin" 
    element={isAdminLoggedIn ? 
    <Admin
    courses = {courses} 
    teachers = {teachers}
    />:<Navigate to="/admin/login"/>}/>

    <Route path="/student/login" 
    element={<LoginStudent
    students= {students}/>}/> 

    <Route path="/student" 
    element={isStudentLoggedIn ? <StudentPortal 
      studentsDb = {students}
      coures = {courses}/>: <Navigate to="/student/login"/>}/>


    <Route path="/student/student-kurser/register">
      <Route index element={isStudentLoggedIn ? 
      <RegistreringKurs
      studentsDb = {students}
      courses = {courses}
      />: 
      <Navigate to="/student/login"/>}/> 
      <Route path=":id" 
      element={isStudentLoggedIn ? 
      <RegisterKurs
        studentsDb = {students}
        courses = {courses}/>: 
      <Navigate to="/student/login"/>}/>
    </Route> 

    <Route path="/kurser">
      <Route index element={isAdminLoggedIn ?<Admin/>:
      <Navigate to="/admin/login"/>}/>
      <Route path=":id" 
      element={isAdminLoggedIn ?
      <Kurs
      coursesDB={courses}
      competencesDB = {competences}
      teachersDB={teachers}/>:
      <Navigate to="/admin/login"/>}/>
      <Route path="/kurser/new" element={isAdminLoggedIn ?
      <AddKurs
      competencesDB = {competences}
      coursesDB={courses}
      teachersDB={teachers}/>
      :<Navigate to="/admin/login"/>}/>
    </Route>

    <Route path="/larare">
      <Route index element={isAdminLoggedIn ?
      <Admin/>:
      <Navigate to="/admin/login"/>}/>
      <Route path=":id" element={isAdminLoggedIn ?
      <Teacher
      teachersDB={teachers}
      coursesDB={courses}
      competencesDB = {competences}
      />:
      <Navigate to="/admin/login"/>}/>
      <Route path="/larare/new" 
      element={isAdminLoggedIn ?
      <AddNewTeacher
      teachersDB={teachers}
      coursesDB={courses}
      competencesDB = {competences}/>:
      <Navigate to="/admin/login"/>}  />
    </Route>

    <Route path="*" element={<NoMatch/>}/>
  </Routes>
  );
}
 
export default Routing;