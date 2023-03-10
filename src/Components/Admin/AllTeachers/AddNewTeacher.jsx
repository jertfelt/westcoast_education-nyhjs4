import { useFirebase } from "../../utils/useFirebase";
import { useState, useEffect } from "react";
import TeacherAddOrChange from "../Forms/TeacherAddOrChange";
import { Section, InfoRuta } from "../../StylingElements/SectionsAdmin/AdminComponents";

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
  <Section>
    {showModal && <></>}
    <InfoRuta>
    <TeacherAddOrChange 
    data-testid="formTeacher"
    typeOfForm = {"registerNew"}
    item = {competences}
    title = {"Registrera ny lärare:"}
    onClick= {() => setShowModal(false)}
    />
    </InfoRuta>
  </Section> 
  );
}
 
export default AddNewTeacher;