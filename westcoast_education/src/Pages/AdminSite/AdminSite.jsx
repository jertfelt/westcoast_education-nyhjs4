import { useContext, useState } from "react";
import AuthContext from "../../Components/store/auth-context";
import Admin from "./Admin";
import Login from "../Login/Login";

const AdminSite = () => {
   const context = useContext(AuthContext)
   const [authenticated, setAuthenticated] = useState(context.isLoggedIn)
  return (
      <section data-testid="Admin">
      {authenticated && <Admin/>}
      {!authenticated && <Login/>}
      </section>
   );
}
 
export default AdminSite;