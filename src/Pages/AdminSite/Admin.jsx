import { useContext} from "react";
import AuthContext from "../../Context/Auth.Context";
import styled from "styled-components";
import AddTeacherOrCourseToggle from "../../Components/Admin/Forms/AddTeachersOrCoursesToggle";
import AllTeachers from "../../Components/Admin/AllTeachers/AllTeachers";
import AllaKurser from "../../Components/Admin/Kurs/AllaKurser";


const AdminSite = styled.section`
padding:2rem;
h1{
  text-align:center;
  font-size:36px;
  color: ${({ theme }) => theme.link};
}
h2{
  font-size:2.2rem;
  color: ${({ theme }) => theme.buttonText};
}
a{
  
  &:hover{
    color: ${({ theme }) => theme.accent};
  }
  &:active, &:focus{
    color: ${({ theme }) => theme.link};
    text-transform: underline;
  }
}
h3{
  color: ${({ theme }) => theme.buttonText};
  font-size:1.5rem;
}
p{
  font-size:1.2rem;
}
`
const MainContent = styled.div`
padding:1rem;
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;`

const TwoColumns = styled.div`
background: ${({ theme }) => theme.background};
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
width:100%;
max-width:1000px;
background: ${({ theme }) => theme.accent};
padding:3rem;
display:flex;
color: ${({ theme }) => theme.buttonText};
`
const Admin = () => {
  const context = useContext(AuthContext)
  return (
  <AdminSite
  data-testid="Admin">
    <h1>Välkommen, {context.userName}</h1>
    <MainContent>
    <FormContainer>
        <AddTeacherOrCourseToggle/>
    </FormContainer>
      <TwoColumns>
        
        <AllTeachers />
        <AllaKurser />
      
      </TwoColumns> 
     
    </MainContent>
  </AdminSite>  );
}
 
export default Admin;