import { useContext, useState } from "react";
import AuthContext from "../../Context/Auth.Context";
import styled from "styled-components";
import AddTeacherOrCourseForm from "../../Components/Admin/Forms/AddTeachersOrCoursesForm";

const TwoColumns = styled.div`
display:flex;
width:100%;
max-width:1000px;
flex-direction: row;
padding:3rem;
gap: 20px;

justify-content:space-between;`

const Grid = styled.div`
`
const Content = styled.div``

const FormContainer = styled.div`
`
const Admin = () => {
  const context = useContext(AuthContext)
  return (<section 
  data-testid="Admin">
    <h1>Välkommen, {context.userName}</h1>
    <TwoColumns>
      <Content>
      <h2>Alla lärare</h2>
      <Grid>

      </Grid>
      </Content>
      <Content>
      <h2>Alla kurser</h2>
      
      <Grid>
      
      </Grid>
      </Content>
    </TwoColumns>
    <FormContainer>
    <AddTeacherOrCourseForm/>
    </FormContainer>
  </section>  );
}
 
export default Admin;