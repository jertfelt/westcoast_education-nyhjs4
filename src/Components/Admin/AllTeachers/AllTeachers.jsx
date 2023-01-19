
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";

import { useEffect } from "react";

const Grid = styled.div`
display:flex;
flex-direction:column;
gap:1rem;
`
const GridTeacher = styled.div`
display:flex;
flex-direction: column;
align-items: center;

div{
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  width:100%;
  padding:2rem;
  padding-top:0; 
  h3{
    margin-bottom:1rem;
  }
}
a{
  background:${({ theme }) => theme.body};
  color:${({ theme }) => theme.link};
  padding: 6px;
  border-radius:9px;
}
`
const Row = styled.div`
display:flex;
align-items: center;
justify-content:center;
gap:1rem;` 

const AllTeachersContent = styled.div`
display:flex;
flex-direction: column;
background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.buttonText};
`
const List = styled.ul`
text-align:left;
padding-bottom:1rem;`

const Filter= styled.div`
display:flex;
align-items: center;
gap: 4px;`

const AllTeachers = () => {
  const {data,error,loading} = useFirebase("/teachers")
  const [competences, setCompetences] = useState([])
  const [defaultView, setDefault] =useState(true)
  const [filterValue, setFilterValue] = useState("")

 
  useEffect(() => {
    if(data){
      let comp = data.map(item => item.competences)
      const flatten = [].concat(...comp)
      setCompetences(flatten)
    }
  },[data])

  const filterTeacher = (e) => {
    if(e.target.value ==="default"){
      setDefault(true)
    }
    else{
      setFilterValue(e.target.value)
      setDefault(false)
    }
  }

  return (
  <AllTeachersContent 
  data-testid="allTeachers">
    <Row>
    <h2>Alla lärare</h2>
    <Filter>
      <label htmlFor="filterTeachers">Filtrera:</label>
      <select id ="chooseTeachers"
      aria-label="Select"
      onChange={filterTeacher}>
        <option value="default">Välj:</option>
      {data && competences.map((item,indx) => (
         <option 
         key={`${item}--${item}--${indx}1`}
         value={item} 
         >{item}</option>
      ))}
     
      </select>
    </Filter>
    </Row>
      <Grid>
        {error && <p>Något är fel på servern.</p>}
        {loading && <p>Laddar..</p>}
        {defaultView ? (<>
        {data && data.map(((teacher) => (
          <GridTeacher 
          key={teacher.personalID}
          >
          <div>
          <h3>{teacher.firstName} {teacher.lastName}</h3>
          
          <Link to={`/larare/${teacher.id}`}>Se mer </Link>
          </div>
          </GridTeacher>
        )))}    
        </>):(<>{data && 
          data.filter(item => item.competences.includes(filterValue)).map(teacher => (
            <GridTeacher 
            key={teacher.personalID}
            >
            <div>
              
            <h3>{teacher.firstName} {teacher.lastName}</h3>
            <p>Samtliga kompetenser:</p>
            <List>
              
            {teacher.competences.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
            </List>
            <Link
            to={`/larare/${teacher.id}`}>Se mer </Link>
            </div>
        
            </GridTeacher>
          ))
        }
          
          </>
        )}
      </Grid>

  </AllTeachersContent> );
}
 
export default AllTeachers;