import RegisterNewTeacherForm from "../Forms/RegisterNewTeacherForm";
import { useFirebase } from "../../utils/useFirebase";
import { useState, useEffect } from "react";

const AddNewTeacher = () => {
  const {data} = useFirebase("/competences")
  const [competences, setCompetences] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if(data){
      setCompetences(data.map(item => item))
    }
  },[data])

  return ( 
  <section>
    <h1>Registrera ny lärare:</h1>
    <RegisterNewTeacherForm
    kompetenser = {competences}
    onClick= {() => setShowModal(false)}
    />


  </section> );
}
 
export default AddNewTeacher;