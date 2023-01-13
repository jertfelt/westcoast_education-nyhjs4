import { useContext, useState } from "react";
import AuthContext from "../../Context/Auth.Context";
import Admin from "./Admin";
import Login from "../../Components/LoginLogOut/Login";

const AdminSite = () => {
   const context = useContext(AuthContext)

   const [authenticated, setAuthenticated] = useState(context.loggedIn)
  return (
      <section data-testid="Admin">
      {authenticated && <Admin/>}
      {!authenticated && <Login/>} 
      </section>
   );
}
 
export default AdminSite;