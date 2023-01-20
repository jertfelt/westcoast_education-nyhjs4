import styled from "styled-components"
import { useFirebase } from "../../utils/useFirebase";
import { Link } from "react-router-dom";

const GridKurser = styled.div`
display:grid;
gap:2px;
`

const Courses = styled.div`
display:flex; 
align-items:flex-start;
justify-content:flex-start;
opacity:0.8;
&:hover{
  opacity:1;
}
p{
  font-size:1rem;
  margin-top:-1rem;
}
h3{
  font-size:2rem;
  line-height:1rem;
}
a{
  &:hover{
    color: ${({ theme }) => theme.accent};
  }
}

`
const Content = styled.div`
background:  ${({ theme }) => theme.background};
h2{
text-align: flex-start;
}`

const AllaKurser = () => {
  const {data,error,loading} = useFirebase("/courses")
  return (
  <Content data-testid="allakurser">
    <h2>Alla kurser</h2>
    {error && <p>Något har blivit fel med servern</p>}
    {loading && <p>Laddar..</p>}
    <GridKurser>
    {data && data.map(courses => (
      <Courses key={courses.courseID}>
        <Link to={`/kurser/${courses.courseID}`}>
        <h3 data-testid="kurstest">{courses.courseName}</h3>
        {courses.published ? (<p>Start: {courses.startDate}</p>):(<p>Start: N/A</p>)}
        <p>Antal studenter: {courses.studentsAssigned}</p>
        </Link>
      </Courses>
    ))}
    </GridKurser>
    </Content>  );
}
 
export default AllaKurser;