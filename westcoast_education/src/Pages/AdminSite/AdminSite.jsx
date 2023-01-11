import { useContext } from "react";
import AppContext from "../../Components/context/AppContext"
import Admin from "./Admin";
import Login from "../Login/Login";

const AdminSite = () => {
  const context = useContext(AppContext)
  const {authenticated, setAuthenticated} = context
  return (
     <>
        {!authenticated && <Login setAuthenticated={setAuthenticated} />}
        {authenticated && <Admin setAuthenticated={setAuthenticated} />}
        </>
   );
}
 
export default AdminSite;