import { useContext} from "react";
import AuthContext from "../../Context/Auth.Context";
import styled from "styled-components";
import AddTeacherOrCourseForm from "../../Components/Admin/Forms/AddTeachersOrCoursesForm";
import AllTeachers from "../../Components/Admin/AllTeachers/AllTeachers";
import AllaKurser from "../../Components/Admin/Kurs/AllaKurser";


const AdminSite = styled.section`
padding:2rem;
h1{
  text-align:center;
  font-size:36px;
}
`
const MainContent = styled.div`
padding:1rem;
display: flex;
align-items:center;
justify-content:center;`

const TwoColumns = styled.div`
background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.text};
display:flex;
@media (min-width:800px){
  flex-direction:row;
}
flex-direction:column;
width:100%;
max-width:1000px;

padding:3rem;
gap: 20px;
justify-content:space-around;`

const FormContainer = styled.aside`
`
const Admin = () => {
  const context = useContext(AuthContext)
  
  

  return (
  <AdminSite
  data-testid="Admin">
    <h1>Välkommen, {context.userName}</h1>
    <MainContent>
     <TwoColumns>
      <AllTeachers 
      />
      <AllaKurser 
      />
    </TwoColumns> 
    </MainContent>
    <FormContainer>
    <AddTeacherOrCourseForm/>
    </FormContainer>
    
  </AdminSite>  );
}
 
export default Admin;