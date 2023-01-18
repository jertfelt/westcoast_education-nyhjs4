import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import styled from "styled-components";
import { useEffect,  useState } from "react";
import { useDates } from "../../utils/useDates";

import KursChangeForm from "./KursChangeForm";

const Section = styled.section`
display: flex;
align-items:center;
flex-direction:column;
justify-content:center;
padding:10rem;
`

const InfoRuta = styled.div`
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
max-width:500px;
padding:2rem;
padding-top:0rem;
ul{
  list-style:none;
}
p{
  font-size:1rem;
}
margin-bottom:-2rem;
button{
  padding: 4px 8px;
  color: ${({ theme }) => theme.toggleBorder};
  background: ${({ theme }) => theme.accent};
border:none;
font-size:14px;
border-radius:30px;
margin-top:1rem;
&:hover{
  background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
}
}
`

const Kurs = () => {
  const {id} = useParams()
  let noId = Number(id)
  const {data} = useFirebase("/courses")
  const [changeForm, setChangeForm] = useState(false);
  const {year, nextYear} = useDates()

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
          onClick={() => setChangeForm(true)}>Redigera kurs</button>
          
      </div>

    ))}</>
      
    )}
    </InfoRuta>
    {/*
  
        
   ( <div>
         
          

          </div>

)}
          </div>
        ))
        }
    </InfoRuta>  */}
  </Section> );
}
 
export default Kurs;