import styled from "styled-components"
import { useFirebase } from "../../utils/useFirebase";
import { Link } from "react-router-dom";

const GridKurser = styled.div`
display:grid;
gap:2px;
`

const Courses = styled.div`
background:none;
display:flex; 
align-items:flex-start;
justify-content:flex-start;
opacity:0.8;
&:hover{
  opacity:1;
}

`
const Content = styled.div`
h2{
text-align: flex-start;
}`

const AllaKurser = () => {
  const {data,error,loading} = useFirebase("/courses")
  return (
  <Content>
    <h2>Alla kurser</h2>
    {error && <p>Något har blivit fel med servern</p>}
    {loading && <p>Laddar..</p>}
    <GridKurser>
    {data && data.map(courses => (
      <Courses key={courses.courseID}>
        <Link to={`/kurser/${courses.courseID}`}>
        <h3>{courses.courseName}</h3>
        <p>Start: {courses.startDate}</p>
        </Link>
      </Courses>
    ))}
    </GridKurser>
    </Content>  );
}
 
export default AllaKurser;