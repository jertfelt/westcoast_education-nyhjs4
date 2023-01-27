import Registrering from "../../Pages/RegisterStudent/RegisterCourse";
import { useParams } from "react-router-dom";

const RegisterKurs = ({studentsDb, courses}) => {
  const {id} = useParams()
  return (
  <Registrering 
  name={id}
  studentsDb = {studentsDb}
  courses= {courses}
  />  );
}
export default RegisterKurs;