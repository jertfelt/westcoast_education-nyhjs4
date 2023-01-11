import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Startsida/Homepage";
import Login from "./Pages/Login/Login";
import AdminSite from "./Pages/AdminSite/AdminSite";
import Registrering from "./Pages/RegisterStudent/Registrering";
import NoMatch from "./Pages/NoMatch/NoMatch";


const Routing = () => {
  return (   <Routes>
    <Route path="/" 
    element={<HomePage/>}/>
    <Route path="/login"
    element={<Login/>}/>
    <Route path="/admin" 
    element={<AdminSite/>}/>
    <Route path="/register" 
    element={<Registrering/>}/>
    <Route path="*" element={<NoMatch/>}/>
  </Routes>
   );
}
 
export default Routing;