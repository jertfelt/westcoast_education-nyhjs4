
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../utils/useFirebase";
import { useEffect } from "react";
import { AllTeachersContent, HeadingWFilter, Filter, Grid, GridTeacher, List } from "../../StylingElements/SectionsAdmin/AdminComponents";


const AllTeachers = ({teachers}) => {
  const [competencesTeachers, setCompetences] = useState([])
  const [defaultView, setDefault] =useState(true)
  const [filterValue, setFilterValue] = useState("")

  useEffect(() => {
    if(teachers){
      let comp = teachers.filter(function (teacher){
        return teacher.status !== "DELETED"}).map(item => item.competences)
      const flatten = [].concat(...comp)
      setCompetences(flatten)
    }
  },[teachers])

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
    {!teachers ? <p>Laddar...</p>: <>
    <HeadingWFilter>
    <h2>Alla lärare</h2>
   
    <Filter>
      <label htmlFor="filterTeachers">Filtrera:</label>
      <select id ="chooseTeachers"
      aria-labelledby ="Filtrera"
      onChange={filterTeacher}>
          <option value="default">Välj:</option>
          {teachers && competencesTeachers.map((item,indx) => (
          <option 
          key={`${item}--${item}--${indx}1`}
          value={item} 
          >{item}</option>
          ))}
      </select>
    </Filter>
    </HeadingWFilter>

      <Grid>
        {defaultView ? (<>
        {teachers && teachers.filter(function (item){
          return item.status !== "DELETED"}).map(((teacher) => (
          <GridTeacher 
          key={teacher.personalID}>
          <div>
            <h3>{teacher.firstName} {teacher.lastName}</h3>
            <p>{teacher.email}</p>
            <Link to={`/larare/${teacher.id}`}>
              Se mer </Link>
          </div>
          </GridTeacher>
        )))}    
        </>):(<>{teachers && 
          teachers.filter(item => item.competences.includes(filterValue)).map(teacher => (
            <GridTeacher 
            competences
            key={teacher.personalID}>
              <div 
              className={teacher.competences.length === 1 && "center_one_item"}>
              <h3>{teacher.firstName} {teacher.lastName}</h3>
              <p>{teacher.competences.length === 1 ? "": "Alla kompetenser:"} </p>
              <List 
              className={teacher.competences.length === 1 && "one_item"}>
                {teacher.competences.map((c, i) => (
                  <li key={i}
                  className={c=== filterValue && "filtered"}>
                    {c}
                  </li>
                ))}
              </List>
              <Link
              to={`/larare/${teacher.id}`}>
                Se mer </Link>
              </div>
            </GridTeacher>
          ))
        }
          </>
        )}
      </Grid>
      </>}
  </AllTeachersContent> );
}
 
export default AllTeachers;