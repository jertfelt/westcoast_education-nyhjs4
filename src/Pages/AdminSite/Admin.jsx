import { useContext, useState} from "react";
import AuthContext from "../../Context/Auth.Context";
import AddTeacherOrCourseToggle from "../../Components/Admin/Forms/AddTeachersOrCoursesToggle";
import AllTeachers from "../../Components/Admin/AllTeachers/AllTeachers";
import AllaKurser from "../../Components/Admin/Kurs/AllaKurser";
import AdminSite, { FormContainer, TwoColumns, MainContent, Details} from "../../Components/StylingElements/SectionsAdmin/AdminSite"



const Admin = ({courses, teachers, competences}) => {

  return (
  <AdminSite
  data-testid="Admin">
    <MainContent>
    <FormContainer>
      <h1>Välkommen</h1>
      <AddTeacherOrCourseToggle/>
    </FormContainer>
      <TwoColumns
      AdminForm>
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