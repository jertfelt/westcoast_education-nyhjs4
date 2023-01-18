import styled from "styled-components"
import { useFirebase } from "../../utils/useFirebase";
import { Link } from "react-router-dom";

const GridKurser = styled.div`
display:grid;
gap:0.8rem;
`

const Courses = styled.div`
background:none;
display:flex; 
align-items:center;
gap: 6px;
justify-content:space-around;
&:hover{
  opacity:0.8;
}
`
const Content = styled.div`
h2{
text-align:center;
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
        </Link>
      </Courses>
    ))}
    </GridKurser>
    </Content>  );
}
 
export default AllaKurser;