import { useState, useRef, useContext} from "react";
import StudentContext from "../../Context/StudentContext";
import { FormInstructions } from "../../Components/StylingElements/Form/Form";
import Button from "../../Components/StylingElements/Buttons/FormButton";
import Studentsections from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";


const RegisterCourseForm = (props) => {
  const context = useContext(StudentContext);
  const [validInputs, setValidInputs] = useState(false)
  const emailInputRef = useRef()
  const courseInputRef = useRef()
  const courseInputRef2 = useRef()

  const {data, error, loading} = useFirebase("/courses")
  const [course2, setCourse2] = useState("")
  
  const STUDENTS_URL = "http://localhost:8000/students"

  const clearForm = () => {
  emailInputRef.current.value=""
  courseInputRef.current.value=""
  courseInputRef2.current.value=""
  }

const onSubmit = async(e) => {
  e.preventDefault()
  if(courseInputRef2.current.value === "Välj"){
    setCourse2("")
  }
  else{
    setCourse2(courseInputRef2.current.value)
  }

fetch(STUDENTS_URL, {
  method:"PATCH",  
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "studentEmail": emailInputRef.current.value,
    "courses": {"firstChoice": {
      "subject" : courseInputRef.current.value
    },
    "secondChoice":{
      "subject" : course2
    }
    }
  }
  )})
  clearForm()
}

  return ( 
  <Studentsections 
  data-testid="RegisterStudentKurs">

    <FormInstructions
    onSubmit={onSubmit}>
   
    <h2>{context.studentName}</h2>
    {loading ? <p> Laddar... </p> : <>
    {error && <p> Något är fel på databasen</p>}
      <label htmlFor="firstChoice">
        Kursval 1:</label>
      <select 
      id="firstChoice"
      data-testid="studentcours1"
      ref={courseInputRef}
      required
      onChange={() => setValidInputs(true)}
      >
        <option 
        value={props.name ||"Välj:"} 
        data-testid="optionDefault"
        label={props.name ||"Välj:"}/>

        {data && data.filter(function (course){
          return course.courseName !== props.name}).map(item => ( 
        <option 
        value={item.courseName}
        key={item.courseID}>
          {item.courseName}
        </option>)
        )}
      </select>
      
      <label htmlFor="secondChoice">
        **Kursval 2:</label>
      <select id="secondChoice" 
      ref={courseInputRef2}
      data-testid="studentcourse2"
      >
      <option 
      value="Välj:" 
      name="Välj:"
      label="Välj:"/>
        {data && data.filter(function (course){return course.courseName !== props.name}).map(item => ( <option key={item.courseID} value={item.courseName}>{item.courseName}</option>)
        )}
        <option 
        value="Ingen"
        data-testid="IngetVal"
        name="Ingen"
        label="Ingen"/>
      </select>
      <p className="instructions">
        ** Detta är inte obligatoriskt för att du ska kunna anmäla dig, men det kan vara bra att ha en back-up.</p>
      <Button 
      className={validInputs ? "enabled" :""}
      disabled={validInputs ? true : false}
      type="submit"
      value="Skicka"
      />
      
      </>}
    </FormInstructions>
  

  </Studentsections> );
}
 
export default RegisterCourseForm ;