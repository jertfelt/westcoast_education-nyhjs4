import { useContext} from "react";
import AuthContext from "../../Context/Auth.Context";
import AddTeacherOrCourseToggle from "../../Components/Admin/Forms/AddTeachersOrCoursesToggle";
import AllTeachers from "../../Components/Admin/AllTeachers/AllTeachers";
import AllaKurser from "../../Components/Admin/Kurs/AllaKurser";
import AdminSite, { FormContainer, TwoColumns, MainContent} from "../../Components/StylingElements/SectionsAdmin/AdminSite"

const Admin = ({courses, teachers, competences}) => {
  const context = useContext(AuthContext)
  return (
  <AdminSite
  data-testid="Admin">
 
    <MainContent>
    <FormContainer>
      <h1>Välkommen, {context.userName}</h1>
      <AddTeacherOrCourseToggle/>
    </FormContainer>
      <TwoColumns>
        <AllTeachers 
        teachers = {teachers} 
        />
        <AllaKurser 
        courses = {courses} 
        />
      </TwoColumns> 
    </MainContent>
  </AdminSite>  );
}
 
export default Admin;