import { Link } from "react-router-dom";
import { Links } from "./AdminStyledSections";

const RegisterOrLoginContainer = () => {
  return ( <>
   <Links>
          Har du inget konto?  <br/>
          <Link to="/admin/register">Registrera dig nu.</Link> 
          <p>Det kostar inget att vara admin!</p>
    </Links></> );
}
 
export default RegisterOrLoginContainer;