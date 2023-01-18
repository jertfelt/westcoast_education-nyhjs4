import Registrering from "../../Pages/RegisterStudent/RegisterCourse";
import { useParams } from "react-router-dom";

const RegisterKurs = () => {
  const {id} = useParams()
  return (
  <Registrering 
  name={id}
  />  );
}
export default RegisterKurs;