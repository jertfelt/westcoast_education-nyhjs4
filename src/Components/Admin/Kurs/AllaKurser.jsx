import { useState } from "react";
import { Content, Filter, GridKurser, HeadingWithFilterAdmin } from "../../StylingElements/SectionsAdmin/AdminComponents";
import { useEffect } from "react";
import KursInList, { KursNotPublishedOnly, KursPublishedOnly } from "./KursInList";


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
      <KursInList
      key={courses.courseID}
      courses={courses}
      />
    ))}
    {!defaultView && published && publishedFilter.map(courses => (
      <KursPublishedOnly 
      key={`${courses.courseID}${courses.courseID}`}
      courses={courses}/>
      ))}
    {!defaultView && notpublished && filteredUnPublish.map(courses => (
    <KursNotPublishedOnly
    key={`${courses.courseID}${courses.courseID}`}
    courses={courses}/>
        )) }      
    </GridKurser>
    </>}
    </>}
    </Content>  );
}
 
export default AllaKurser;