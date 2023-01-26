import { useState } from "react";
import { Link } from "react-router-dom";
import { Content, Courses, Filter, GridKurser, HeadingWithFilterAdmin } from "../../StylingElements/SectionsAdmin/AdminComponents";
import { useEffect } from "react";


const AllaKurser = ({courses}) => {
  
  const [defaultView, setDefault] =useState(true)
  const [notpublished, setCheckNotpublished] = useState(true)
  const [published, setCheckPublished] = useState(true)
  const [filteredUnPublish, setShowFiltered] = useState([])
  const [publishedFilter, setFilteredPublished] = useState([])


  useEffect(() => {
    if(courses){
      let filter = courses.filter(item => {return item.status!== "DELETED"})
      let notPublished = filter.filter(course => {return course.published === false}).map(item => item)

      setShowFiltered(notPublished)

      setFilteredPublished(courses.filter(item => {return item.status!== "DELETED"}).filter(course => {return course.published === true}).map(filtered => filtered))
  }
},[courses])
  
  const filterCourses = (e) => {
    switch(e.target.value){
      case "published":
      setDefault(false)
      setCheckNotpublished(false)
      setCheckPublished(true)
      break;
      case "notpublished":
        setDefault(false)
        setCheckPublished(false)
        setCheckNotpublished(true)
      break;
        default:
          setDefault(true)
          setCheckNotpublished(false)
          setCheckPublished(false)
    }
  }

  return (
  <Content data-testid="allakurser">
    {!courses ? <p>Laddar..</p> : <> 
    {courses && <>
    <HeadingWithFilterAdmin>
      <h2>Alla kurser</h2>
    <Filter>
    <label htmlFor="filterCourses">Filtrera:</label>
      <select id ="chooseCourses"
      aria-labelledby ="Filtrera"
      onChange={filterCourses}>
          <option value="default">
            Alla</option>
          <option value="published">
            Publicerade</option>
          <option value="notpublished">
            Ej publicerade</option>
      </select>
    </Filter>
    </HeadingWithFilterAdmin>
    <GridKurser>
    {defaultView && courses.filter(function (course){
      return course.courseName !== "DELETED"
    }).map(courses => (
      <Courses 
      key={courses.courseID}>
        <Link 
        to={`/kurser/${courses.courseID}`}>
        <h3 
        data-testid="kurstest">
        {courses.courseName}</h3>
        {courses.published ? (<>
        <p><strong>Publicerad</strong></p>
        <p>Start: {courses.startDate}</p>
        <p>Antal studenter: {courses.studentsAssigned}</p>
        </>
        ):(<>
        <p><strong>Ej publicerad</strong></p>
        </>)}
        </Link>
      </Courses>
    ))}
    {!defaultView && published && publishedFilter.map(courses => (
        <Courses 
        key={`${courses.courseID}${courses.courseID}`}>
        <Link 
        to={`/kurser/${courses.courseID}`}>
        <h3 
        data-testid="kurstest">
          {courses.courseName}</h3>
        <p>Start: {courses.startDate}</p>
        <p>Anmälda: {courses.studentsAssigned}</p>
        </Link>
      </Courses>
      ))}
    {!defaultView && notpublished && filteredUnPublish.map(courses => (
          <Courses 
          key={`${courses.courseID}${courses.courseID}`}>
          <Link 
          to={`/kurser/${courses.courseID}`}>
     
          <h3 data-testid="kurstest">
            {courses.courseName}</h3>
            <p><strong>Ej publicerad</strong></p>
          <p>Anmälda: {courses.studentsAssigned}</p>
          </Link>
        </Courses>
        )) }      
    </GridKurser>
    </>}
    </>}
    </Content>  );
}
 
export default AllaKurser;