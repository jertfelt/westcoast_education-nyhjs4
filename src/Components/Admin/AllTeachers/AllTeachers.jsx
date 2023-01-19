
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import { useRef } from "react";
import { useEffect } from "react";

const Grid = styled.div`
display:flex;
flex-direction:column;
`
const GridTeacher = styled.div`
display:flex;
flex-direction: column;
align-items: center;
div{
  text-align:center;
  h3{
    margin-bottom:1rem;
  }
  a {   
    padding: 6px 10px;
    border-radius:9px;
    background:${({ theme }) => theme.buttonText};
  }
}
 
`
const AllTeachersContent = styled.div`
display:flex;
flex-direction: column;
background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.buttonText};
`

const Filter= styled.div``

const AllTeachers = () => {
  const {data,error,loading} = useFirebase("/teachers")
  const [competences, setCompetences] = useState([])

  useEffect(() => {
    if(data){
      let comp = data.map(item => item.competences)
      setCompetences(uniqueArray(comp[0].concat(comp[1])))   
    }
  },[data])

  const uniqueArray = (array) => {
    let a = array.concat()
    for (let i= 0; i< a.length; ++i){
      for(let j = i+1; j< a.length; ++j){
        if(a[i] === a[j]){
          a.splice(j--,1)
        }
      }
      return a
    }
  }

  const filterTeacher = (e) => {

  }

  return (
  <AllTeachersContent 
  data-testid="allTeachers">
    <h2>Alla lärare</h2>
    <Filter>
      <label htmlFor="filterTeachers">Filtrera:</label>
      <select id ="chooseTeachers"
      aria-label="Select"
      onChange={filterTeacher}>
        
      {data && competences.map((item,indx) => (
         <option 
         key={indx}
         value={item} 
         >{item}</option>
      ))}
     
      </select>
    </Filter>
      <Grid>
        {error && <p>Något är fel på servern.</p>}
        {loading && <p>Laddar..</p>}
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
      </Grid>

  </AllTeachersContent> );
}
 
export default AllTeachers;