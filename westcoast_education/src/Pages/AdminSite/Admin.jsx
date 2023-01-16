import { useContext, useState, useEffect } from "react";
import AuthContext from "../../Context/Auth.Context";
import styled from "styled-components";
import AddTeacherOrCourseForm from "../../Components/Admin/Forms/AddTeachersOrCoursesForm";
import { Link } from "react-router-dom";

const TwoColumns = styled.div`
display:flex;
@media (min-width:800px){
  flex-direction:row;
}
flex-direction:column;
width:100%;
max-width:1000px;

padding:3rem;
gap: 20px;
justify-content:space-between;`

const Grid = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
div{


}
a{
}
`
const Courses = styled.div`
background:none;
`
const Content = styled.div``

const CollapsedDiv=styled.div``

const FormContainer = styled.aside`
`
const Admin = () => {
  const context = useContext(AuthContext)
  const teacherURL = "http://localhost:8000/teachers"
  const coursesURL = "http://localhost:8000/courses"
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    fetch(teacherURL)
    .then(res => res.json())
    .then(data => setTeachers(data))
    fetch(coursesURL)
    .then(res => res.json())
    .then(data => setCourses(data))
   }, [])

  return (
  <section 
  data-testid="Admin">
    <h1>Välkommen, {context.userName}</h1>
    <TwoColumns>
      <Content>
      <h2>Alla lärare</h2>
      <Grid>
        {teachers.map(teacher => (
          <div key={teacher.personalID}
          >
          <div onClick={() => setCollapsed(prev => !prev)}>
          <h3>{teacher.firstName} {teacher.lastName}</h3>
          {collapsed && <CollapsedDiv>
          <p><strong>Kompetenser:</strong><br/>{teacher.competences}
          </p>
          <p><strong>Kontakt:</strong><br/>{teacher.email}
          </p> 
          </CollapsedDiv>}
          </div>
          <Link to="/{teacher.firstName}">
            Se mer
          </Link>
          </div>
        ))}
      </Grid>
      </Content>
      <Content>
      <h2>Alla kurser</h2>
      
      <Grid>
      {courses.map(courses => (
        <Courses key={courses.courseID}>
          <h3>{courses.courseName}</h3>
          <Link to="/{courses.courseName}">
            Se mer
          </Link>
        </Courses>
      ))}
      </Grid>
      </Content>
    </TwoColumns>
    <FormContainer>
    <AddTeacherOrCourseForm/>
    </FormContainer>
  </section>  );
}
 
export default Admin;