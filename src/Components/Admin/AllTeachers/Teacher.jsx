import { useNavigate, useParams, Link } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import { useState, useEffect } from "react";
import { Section, InfoRuta, ButtonContainer } from "../../StylingElements/SectionsAdmin/AdminComponents";
import TeacherChangeForm from "../Forms/TeacherChangeForm";

const Teacher = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data,error, loading} = useFirebase("/teachers")
  let noId = Number(id)
  const [changeForm, setChangeForm] = useState(false);
  const [competences, setCompetences] = useState([])
  useEffect(() => {
    if(data){
      let comp = data.map(item => item.competences)
      const flatten = [].concat(...comp)
      setCompetences(flatten)
    }
  },[data])



  return ( 
  <Section>
    {loading && <p>Laddar..</p>}
    {error && <p>Något har blivit fel med servern</p>}
    <InfoRuta>
      {changeForm ? (<>
        {data && data.filter(item => item.id === noId).map(item => (
      <TeacherChangeForm 
      key={item.firstName}
      teacher = {item}
      allaKompetenser = {competences}
      onChange = {() => setChangeForm(false)}
      />
    ))}
      </>):(<>
     {data && data.filter(item => item.id === noId).map(item => (
      <div key= {noId}>
        <h1>{item.firstName} {item.lastName}</h1>
        <p>Personnummer: {item.personalID}</p>
        <p>Email: {item.email}</p>
        <p>Mobil: {item.mobileNo}</p>
        <h3>Kompetenser:</h3>
        <ul>
        {item.competences.map((comp => (
          <li key={comp}>
            <Link to="/kurser">{comp}
            </Link>
            </li>
        )))}
        </ul>
        <ButtonContainer>
        <button 
    onClick={() => navigate(-1)}>
    Gå  tillbaka
  </button>
  <button 
          onClick={() => setChangeForm(true)}>Redigera</button>
          </ButtonContainer>
      </div>
    ))}
    </>)}
    
  </InfoRuta>
  </Section> 
  );
}
 
export default Teacher;