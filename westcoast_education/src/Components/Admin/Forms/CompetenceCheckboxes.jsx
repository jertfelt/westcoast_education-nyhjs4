import axios from "axios";
import { useEffect, useState, useCallback} from "react";
import styled from "styled-components";
import Modal from "../../ui/Modal/Modal";
const Container = styled.div`
`

const CheckBox = ({competence, isChecked, onAddCompetence, onRemoveCompetence}) => (
  <div key = {competence.competenceID}>
  <input 
        type="checkbox"
        id={`kompetens ${competence.competenceID}`}
        checked={isChecked}
        onChange={isChecked ? onAddCompetence : onRemoveCompetence}
        name="competences"
        value={competence.competence}/>
        <label 
        htmlFor={`kompetens ${competence.competenceID}`}>
          {competence.competence}
        </label>
  </div>
)

const CompetenceList = (ref) => {
 const [competences, setCompetences] = useState([])
 const [error, setError] = useState(null)
 const [allTeachers, setAllTeachers] = useState([])
 const [modifiedData, setModifiedData] = useState({ categories: [], description: '', name: '' })
 const [showModal, setShowModal] = useState(false)

 const competenceURL = "http://localhost:8000/competences"
 const teacherURL = "http://localhost:8000/teachers"

 const handleInputChange = useCallback(({target: {name, value} }) => {
  setModifiedData(prevData => ({prevData, [name]: value}))
 }, [])

 const handleSubmit = async (e) => {
  e.preventDefault()
  .post(teacherURL, modifiedData)
  .then(res => {
    console.log(res, "response from axios post")
  })
  .catch(error => {
    setError(error)
  })  
 }

 useEffect(() => {
  axios
  .get(teacherURL)
  .then(({data}) => setAllTeachers(data))
  .catch(error => setError(error))
 })

 if(error){
  setShowModal(true)
 }
 useEffect(() => {
  fetch(competenceURL)
  .then(res => res.json())
  .then(data => setCompetences(data))
 }, [])

 return(
  <Container data-testid="competenceListComponent">
    <p>Välj en eller flera kompetenser:</p>
    {competences.map((c) => (
      <div key={c.competenceID}>
        <input 
        type="checkbox"
        id={`kompetens ${c.competenceID}`}
        name={`kompetens ${c.competenceID}`}
        value={c.competence}/>
        <label 
        htmlFor={`kompetens ${c.competenceID}`}>
          {c.competence}
        </label>
        
      </div>
    ))}
    {showModal && (
      <Modal 
      title="Något gick fel!"
      message="Prova igen!"
      onClick={() => setShowModal(false)} />
    )}
  </Container>
 )

}
export default CompetenceList