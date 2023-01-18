import { useNavigate, useParams, Link } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import styled from "styled-components";

const Section = styled.section`
display: flex;
align-items:center;
min-height:80vh;
flex-direction:column-reverse;
justify-content:center;
button{
  padding: 4px 6px;
  color: ${({ theme }) => theme.toggleBorder};
  background: ${({ theme }) => theme.accent};
border:none;
border-radius:30px;
margin-top:1rem;
&:hover{
  background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
}
}`

const InfoRuta = styled.div`
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
position: fixed;
top:30vh;
background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
max-width:500px;
padding:2rem;
ul{
  list-style:none;
}
margin-bottom:-2rem;
`

const Teacher = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data,error} = useFirebase("/teachers")
  let noId = Number(id)

  return ( 
  <Section>
    {error && <p>Något har blivit fel med servern</p>}

     {data && data.filter(item => item.id === noId).map(item => (
      <InfoRuta key= {item.id}>
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
        <button 
    onClick={() => navigate(-1)}>
    Gå  tillbaka
  </button>
      </InfoRuta>
    ))}

  </Section> 
  );
}
 
export default Teacher;