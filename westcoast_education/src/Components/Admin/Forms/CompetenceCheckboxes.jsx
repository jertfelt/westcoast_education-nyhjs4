import { useEffect, useState, useRef} from "react";
import styled from "styled-components";

const Container = styled.div`
`
const CompetenceList = (ref) => {
 const [competences, setCompetences] = useState([])

 useEffect(() => {
  fetch("http://localhost:8000/competences")
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
  </Container>
 )

}
export default CompetenceList