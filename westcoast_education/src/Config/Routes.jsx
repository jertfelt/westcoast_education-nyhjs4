import { Routes, Route } from "react-router-dom";
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

const Routing = () => {
  return (   <Routes>
    <Route path="/" 
    element={<HomePage/>}/>
    <Route path="/login"
    element={<Login/>}/>
    <Route path="/admin" 
    // restricted={true}
    element={<AdminSite/>}/>
    <Route path="/register">
      <Route index element={<Registrering/>}/>
      <Route path=":id" element={<RegisterKurs/>}/>
    </Route>
    <Route path="/kurser">
      <Route index element={<AllaKurser/>}/>
      <Route path=":id" element={<Kurs/>}/>
    </Route>
    <Route path="/larare">
      <Route index element={<AllTeachers/>}/>
      <Route path=":id" element={<Teacher/>}/>
    </Route>
    
    <Route path="*" element={<NoMatch/>}/>
  </Routes>
   );
}
 
export default Routing;