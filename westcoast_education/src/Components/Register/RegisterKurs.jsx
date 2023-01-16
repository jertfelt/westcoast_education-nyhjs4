import Registrering from "../../Pages/RegisterStudent/Registrering";
import { useParams } from "react-router-dom";

const RegisterKurs = () => {
  const {id} = useParams()
  return (
  <Registrering 
  name={id}
  />  );
}
 
export default RegisterKurs;