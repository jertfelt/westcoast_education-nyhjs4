
import { useState, useRef, useContext } from "react";
import { useFetch } from "../../Components/utils/useFetch";
import StudentContext from "../../Context/StudentContext";
import LoginStudent from "../../Components/Student/LoginStudent";




const Registrering = (props) => {
  const context = useContext(StudentContext);

  const [showModal, setShowModal] = useState(false)

  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const courseInputRef = useRef()
  const courseInputRef2 = useRef()
  const [student, setStudent] = useState(context.studentLoggedIn)

  const coursesURL = "http://localhost:8000/courses"
  const {data,loading,error} = useFetch(coursesURL)

const clearForm = () => {
  nameInputRef.current.value =""
  emailInputRef.current.value=""
  courseInputRef.current.value=""
  courseInputRef2.current.value=""
}

const onSubmit = async(e) => {
  e.preventDefault()
  clearForm()
}



  return ( 
  <section data-testid="Registrering">
    <h2>Registrera dig på en kurs</h2>
    {!student && <div><h2>För att registrera dig behöver du vara inloggad hos oss.</h2> <LoginStudent/></div>
    }
    {student && <>
    <form onSubmit={onSubmit}>
      <label htmlFor="studentName">
        Ditt namn:
      </label>
      <input id="studentName"
      ref={nameInputRef}
      name="studentName"
      placeholder="Mikaela Phersson"
      type="text"
      required/>
      <label htmlFor="studentEmail">
        Email:
      </label>
      <input id="studentEmail"
      data-testid="studentEmail"
      ref={emailInputRef}
      name="studentEmail"
      placeholder="ditt.namn@gmail.com"
      type="email"
      required/>
      <label htmlFor="firstChoice">
        Kursval 1:</label>
      <select id="firstChoice"
      data-testid="studentcours1"
      ref={courseInputRef}
      required
      >
        <option value={props.name ||"Välj:"} 
        data-testid="optionDefault"
        label={props.name ||"Välj:"}/>
        {data && data.filter(function (course){return course.courseName !== props.name}).map(item => ( <option key={item.courseID}>{item.courseName}</option>)
        )}
      </select>
      
      <label htmlFor="secondChoice">
        **Kursval 2:</label>
      <select id="secondChoice" 
      ref={courseInputRef2}
      data-testid="studentcourse2"
      >
      <option value="Välj:" 
        name="Välj:"
        label="Välj:"/>
        {data && data.filter(function (course){return course.courseName !== props.name}).map(item => ( <option key={item.courseID}>{item.courseName}</option>)
        )}
        <option 
        value="Ingen"
        data-testid="IngetVal"
        name="Ingen"
        label="Ingen"/>
      </select>
      <input type="submit"
      value="Skicka"
      />
    </form>
  
  <p>** Detta är inte obligatoriskt för att du ska kunna anmäla dig, men det kan vara bra att ha en back-up.</p>
  <h3>Bra att veta:</h3>
  <p>När du har bokat en kurs så kommer vi skicka ett bekräftelsemejl med
      betalningsuppgifter och ett välkomstmeddelande. 
      Skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste
      vi tyvärr av ekonomiska skäl boka av kursen. </p>
      </>}
  </section> );
}
 
export default Registrering ;