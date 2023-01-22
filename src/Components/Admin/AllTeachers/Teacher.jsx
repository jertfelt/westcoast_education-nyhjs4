import { useNavigate, useParams} from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import { useState} from "react";
import { Section, InfoRuta, ButtonContainer, TeacherExists } from "../../StylingElements/SectionsAdmin/AdminComponents";
import TeacherAddOrChange from "../Forms/TeacherAddOrChange";
import { Line } from "../../StylingElements/Line/Line";


const Teacher = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data,error, loading} = useFirebase("/teachers")
  let noId = Number(id)
  const [changeForm, setChangeForm] = useState(false);
 
  return ( 
  <Section data-testid="teacherItem">    
    {error && <p>Något har blivit fel med servern</p>}
    {loading ? (<h2>Laddar..</h2>):(
    <InfoRuta>
      {changeForm ? (<>
      {data && data.filter(item => item.id === noId).map(item => (
        <TeacherAddOrChange
        key={`${item.firstName}-${item.id}$`}
        typeOfForm ={"changeTeacher"}
        item={item}
        title = {"Ändra:"}
        onClick = {() => setChangeForm(false)}
        />
      ))}
      </>):(<>
    {data && data.filter(item => item.id === noId).map(item => (
      <TeacherExists 
      key= {noId}>
        <Line/>
        <h1>{item.firstName} {item.lastName}</h1>
        <p>Personnummer: {item.personalID}</p>
        <p>Email: {item.email}</p>
        <p>Mobil: {item.mobileNo}</p>
        <Line/>
        <h3>Kompetenser:</h3>
        <ul>
        {item.competences.map(((comp, indx) => (
          <li key={`${comp}--${indx}${indx}`}>
          {comp} </li>
        )))}
        </ul>
     
      </TeacherExists>
      
    ))}</>)}
       <ButtonContainer>
          <button 
            onClick={() => navigate(-1)}>
            Gå  tillbaka
          </button>
          <button 
          onClick={() => setChangeForm(true)}>Redigera</button>
      </ButtonContainer>
  </InfoRuta>)}
  </Section> 
  );
}
 
export default Teacher;