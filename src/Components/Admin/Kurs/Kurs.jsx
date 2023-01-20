import { useParams } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import { useState } from "react";
import { Section, InfoRuta } from "../../StylingElements/SectionsAdmin/AdminComponents";
import KursChangeForm from "../Forms/KursChangeForm";


const Kurs = () => {
  const {id} = useParams()
  let noId = Number(id)
  const {data} = useFirebase("/courses")
  const [changeForm, setChangeForm] = useState(false);
  
  return ( 
  <Section>
    <h1>Kursdetaljer</h1>
    <InfoRuta>
      {changeForm ? (<>
    {data && data.filter(item => item.courseID === noId).map(item => (
      <KursChangeForm 
      key={item.courseID}
      course = {item}
      onChange = {() => setChangeForm(false)}
      />
    ))}
    </>
    ):(<>
    {data && data.filter(item => item.courseID === noId).map(item => ( 
      <div key={noId}>
        <h1>{item.courseName}</h1>
          <p>Beskrivning: {item.courseDescription}</p>
          {item.published && <>
          <p>Start:{item.startDate}</p>
          <p>Längd: {item.lengthWeeks} veckor</p>  
          <p>Publicerad kurs</p>
          <p>Antal deltagare anmälda: {item.studentsAssigned}</p>
          </>}
          {!item.published && item.studentsAssigned < 5 && <>
            <h3>Ej publicerad kurs</h3>
            <p>Planerad start: {item.startDate}</p>
            <p>Antal deltagare anmälda hittills: {item.studentsAssigned}/5</p>
          </>}
          {!item.published && item.studentsAssigned >= 5 && <>
          <h3>Ej publicerad kurs</h3> 
          <p>Start:{item.startDate}</p>
          <p>Minimum deltagare: 5 <br /> Antal deltagare anmälda hittills: {item.studentsAssigned}</p>
          </>}
          <button 
          onClick={() => setChangeForm(true)}>
            Redigera kurs</button>
      </div>
    ))}</>
    )}
    </InfoRuta>
  </Section> );
}
export default Kurs;