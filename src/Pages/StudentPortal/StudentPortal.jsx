import { useContext, useEffect, useState, useRef } from "react";
import StudentContext from "../../Context/StudentContext";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Modal from "../../Components/ui/Modal/Modal";
import { ProfileSection as Section , ParagraphWithButton} from "../../Components/StylingElements/StudentSections/StudentSections";

const StudentPortal = () => {
  const STUDENTS_URL = "http://localhost:8000/students"
  const studentEmailInput = useRef()
  const studentNameInput = useRef()
  const studentPasswordInput = useRef()
  const context = useContext(StudentContext)
  const [studentName, setName] = useState("")
  const [studentEmail, setEmail] = useState("")
  const [studentPassword, setPassword] = useState("")
  const [changeNameForm, setChangeNameForm] = useState(false)
  const [changeEmailForm, setChangeEmailForm] = useState(false)
  const [changePasswordForm, setChangePassForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [msg, setMsg] = useState("")

  
  useEffect(() => {
    setName(context.studentName)
    setEmail(context.studentEmail)
    setPassword(context.studentPassword)
  }, [context.studentName, context.studentEmail, context.studentPassword])


  
  const changeName = () =>{
    setChangeNameForm(true)
  }
  const changeEmail = () => {
    setChangeEmailForm(true)
  }

  const changePassword = () => {
    setChangePassForm(true)
  }

  
  const clearForms = () => {
    studentEmailInput.current.value = ""
    studentNameInput.current.value =""
    studentPasswordInput.current.value =""
  }

  const CancelHandler = (e) => {
    e.preventDefault();
    clearForms();
  }

  const correctingPassword = () => {
      if (studentPassword === null || undefined){
        
        setShowModal(true)
        setMsg("Du behöver byta lösenord innan du går vidare.")
      }
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    setName(studentNameInput.current.value)
    setEmail(studentEmailInput.current.value)
    setPassword(studentPasswordInput.current.value)
    if(studentEmailInput.current.value === null ||studentEmailInput.current.value === "" ){
      if(studentEmail === null || studentEmail === ""){
        setShowModal(true)
        setMsg("Du behöver fylla i en email!")
      }}
  
    if(studentNameInput.current.value === null || studentNameInput.current.value === ""){
      if(studentName === ""|| studentName === null)
    {
      setShowModal(true)
        setMsg("Du behöver fylla i ett namn!")
    }
  }
    if(studentPasswordInput.current.value === null){
      correctingPassword()
    }
      
    if(studentPassword !== null){
    fetch(STUDENTS_URL,{
      method:"PATCH", headers:{
        "Content-Type": "application/json"
      },
    body: JSON.stringify(
      {
        "studentName" : studentName,
        "studentEmail": studentEmail,
        "studentPassword": studentPassword
      }
    )})
  }
  else{
    fetch(STUDENTS_URL,{
      method:"PATCH", headers:{
        "Content-Type": "application/json"
      },
    body: JSON.stringify(
      {
        "studentName" : studentName,
        "studentEmail": studentEmail,
      }
    )})
  }}
  
  return ( 
  <Section data-testid="studentportal">
    <div>
    <h1>Välkommen, {context.studentName}</h1>
    {showModal && <Modal 
    title="Viktigt!" 
    message= {msg} 
    onClick={() => setShowModal(false)}/>}
    <div>
        <h2>Dina uppgifter:</h2>
        <div>
          <ParagraphWithButton 
          data-testid="paragraph"
          className={changeNameForm ? "offscreen" : "normal"}>
        <p>
          Namn: {studentName}
          </p>
          <button onClick={changeName} data-testid="changeParagraph">Ändra</button>
          </ParagraphWithButton>
          {changeNameForm && <form data-testid="formTest"
          onSubmit={handleSubmit}>
            <label htmlFor="student">Namn:</label>
            <input id="student"
            ref={studentNameInput}
            type="text"
            defaultValue={studentName}
            />
            <input type="submit"
            value="Ändra"/>
            <button onClick={CancelHandler}>Avbryt</button>
            </form>}
          <ParagraphWithButton className={changeEmailForm ? "offscreen" : "normal"}>
        <p>
          Email: {studentEmail}
          </p>
          <button onClick={changeEmail}>Ändra</button>
          </ParagraphWithButton>
          {changeEmailForm && <form onSubmit={handleSubmit}>
            <label htmlFor="studentEmailNew">Email:</label>
            <input id="studentEmailNew"
            ref={studentEmailInput}
            type="email"
            defaultValue={studentEmail}
            />
            <input type="submit"
            value="Ändra"/>
            <button onClick={CancelHandler}>Avbryt</button>
            </form>}
        <button onClick={changePassword}>Byt lösenord</button>
        {changePasswordForm && <form onSubmit={handleSubmit}>
            <label htmlFor="studentNewPassword">Email:</label>
            <input id="studentNewPassword"
            ref={studentPasswordInput}
            type="email"
            defaultValue={studentPassword}
            />
            <input type="submit"
            value="Ändra"/>
            <button onClick={CancelHandler}>Avbryt</button>
            </form>}
        </div>
        
    </div>
    <h2>Dina kurser:</h2>
    <div>
    {!context.studentCourses && <><p>Du har inte anmält dig till några kurser än!</p>
    <HashLink smooth to ="/#kurser">Se kurserna här</HashLink><br/>
    <Link to="/student/student-kurser/register">Anmäl dig här</Link><br/>
    <button className="logoutBtn" 
    onClick={context.onLogout}>Logga ut</button>
    </>
    }
      {context.studentCourses && context.studentCourses.map(item => ( 
        <p></p>
      ))}
    </div>
    </div>
    <div>
    <img src="https://picsum.photos/300/300" 
    alt="Placeholder from Lorem Picsum."></img>
    </div>
    
  </Section> );
}
 
export default StudentPortal;