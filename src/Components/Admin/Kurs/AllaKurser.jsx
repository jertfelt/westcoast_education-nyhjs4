import { useState } from "react";
import { useFirebase } from "../../utils/useFirebase";
import { Link } from "react-router-dom";
import { Content, Courses, Filter, GridKurser } from "../../StylingElements/SectionsAdmin/AdminComponents";


const AllaKurser = () => {
  const {data,error,loading} = useFirebase("/courses")
  const [defaultView, setDefault] =useState(true)
  const [amountofStudentsView, setAmountOfStudents] = useState(true)
  const [notpublished, setCheckNotpublished] = useState(true)
  const [published, setCheckPublished] = useState(true)
  const [filtered, setShowFiltered] = useState([])


  
  const filterCourses = (e) => {
    switch(e.target.value){
      case "published":
      setDefault(false)
      if(data){
     
        setShowFiltered(data.filter(item => {return item.status!== "DELETED"}).filter(course => {return course.published === true}).map(filtered => filtered))
        
      }
      setCheckPublished(true)
      break;
      case "notpublished":
        setDefault(false)
        let filter = data.filter(item => {return item.status!== "DELETED"})
        let notPublished = filter.filter(course => {return course.published === false}).map(item => item)
        setShowFiltered(notPublished)
        setCheckNotpublished(true)
      break;

      

        default:
          setDefault(true)
    }

  }

  return (
  <Content data-testid="allakurser">
    <h2>Alla kurser</h2>
    {error && <p>Något har blivit fel med servern</p>}
    {loading && <p>Laddar..</p>}
    {data && <>
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
    <GridKurser>
    {defaultView && data.filter(function (course){
      return course.courseName !== "DELETED"
    }).map(courses => (
      <Courses key={courses.courseID}>
        <Link 
        to={`/kurser/${courses.courseID}`}>
        <h3 
        data-testid="kurstest">
        {courses.courseName}</h3>
        {courses.published ? (
        <p>Start: {courses.startDate}</p>
        ):(<p>Start: N/A</p>)}
        <p>Antal studenter: {courses.studentsAssigned}</p>
        </Link>
      </Courses>
    ))}
    </GridKurser>
    </>}
    {filtered && <>
    {published && filtered.map(courses => (
      <Courses 
      key={`${courses.courseID}${courses.courseID}`}>
      <Link 
      to={`/kurser/${courses.courseID}`}>
      <h3 
      data-testid="kurstest">
        {courses.courseName}</h3>
      <p>Start: {courses.startDate}</p>
      <p>Antal studenter: {courses.studentsAssigned}</p>
      </Link>
    </Courses>
    ))}
    {notpublished.length > 0 ? 
      (<>{
      filtered.map(courses => (
        <Courses 
        key={`${courses.courseID}${courses.courseID}`}>
        <Link 
        to={`/kurser/${courses.courseID}`}>
        <h3 data-testid="kurstest">
          {courses.courseName}</h3>
        <p>Antal studenter: {courses.studentsAssigned}</p>
        </Link>
      </Courses>
      ))
    }</>):(<p>
      Finns inga avpublicerade kurser!</p>)}
   
    </>}
    </Content>  );
}
 
export default AllaKurser;