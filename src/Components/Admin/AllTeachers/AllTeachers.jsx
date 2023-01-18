
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";

const Grid = styled.div`
display:flex;
flex-direction:column;
gap:1rem;
`
const GridTeacher = styled.div`
display:flex;
gap:1rem;
align-items: center;
h3{
  cursor:pointer;
  color: ${({ theme }) => theme.accent};
  padding:1rem;
}
.accent{
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.toggleBorder};
}
ul{list-style: none;
margin-left:-2rem;
}
a{
  color: ${({ theme }) => theme.accent};
  font-weight:bold;
  cursor:pointer;
  font-size:18px;
}
`
const AllTeachersContent = styled.div`
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.text};
h2{
text-align:center;
}`


const CollapsedDiv=styled.div``

const AllTeachers = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {data,error,loading} = useFirebase("/teachers")
  return (
  <AllTeachersContent 
  data-testid="allTeachers">
    <h2>Alla lärare</h2>
      <Grid>
        {error && <p>Något är fel på servern.</p>}
        {loading && <p>Laddar..</p>}
         {data && data.map((teacher => (
          <GridTeacher 
          key={teacher.personalID}
          >
          <div>
          <h3 onClick={() => setCollapsed(prev => !prev)}
          className={collapsed ? "accent" : ""}>{teacher.firstName} {teacher.lastName}</h3>
          {collapsed && <CollapsedDiv>
          <p><strong>Kompetenser:</strong></p>
          <ul>
            {teacher.competences.map((item, index)=> (
            <li key={index}>{item}</li>
          ))}
          </ul>
          <p><strong>Kontakt:</strong><br/>{teacher.email}
          </p> 
          {collapsed && <Link to={`/larare/${teacher.id}`}>
            Se mer 
          </Link>}
          </CollapsedDiv>}
          </div>
          {!collapsed && <Link to={`/larare/${teacher.id}`}>
            Se mer 
          </Link>}
          </GridTeacher>
        )))}    
      </Grid>

  </AllTeachersContent> );
}
 
export default AllTeachers;