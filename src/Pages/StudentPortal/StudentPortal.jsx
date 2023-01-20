import { useContext, useEffect, useState, useRef } from "react";
import StudentContext from "../../Context/StudentContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "../../Components/ui/Modal/Modal";

const Section = styled.section`
padding:3rem;
min-height:80vh;
color: ${({ theme }) => theme.text};
display:flex;
gap:2rem;
flex-direction:column;
align-items: center;
justify-content:center;
@media (min-width: 800px){
  flex-direction:row;
}
h1{
  font-size:48px;
}
a{
  font-size:14px;
  color: ${({ theme }) => theme.accent};
  &:acive{
    color: ${({ theme }) => theme.accent};
  }
  &:focus{
    color: ${({ theme }) => theme.accent};
  }
  &:hover{
    color: ${({ theme }) => theme.text};
  }
}
img{
  max-width:300px;
  border-radius: 50%;
}
button{
  font-size:14px;
  border:none;
  padding:4px 6px;
  &:hover{
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.body};
  }
}
.logoutBtn{
  margin-top:1rem;
}

form{
  margin-top:1rem;
  display:flex; 
  gap: 5px;
  align-items:center;
  flex-direction:column;
  @media (min-width:768px){
    flex-direction:row;
  }
  input{
    padding: 4px;
  }
  input[type=submit]{
    border:none;
    padding: 4px 6px;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    &:active{
      background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    }
    &:focus{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.highlight};
    }
    &:hover{
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
    }
  }
}
`

const ParagraphWithButton = styled.div`
margin-top:-2rem;
  display:flex;
  gap:10px;
  align-items:center;

.offscreen{
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
`

//!ej testat om den här komponenten funkat ännu (alltså att uppdatera databas) pga denna ingår inte i skoluppgiften

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
    <Link to ="/">Se kurserna här</Link><br/>
    <Link to="/register">Anmäl dig här</Link><br/>
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
    <img src="https://scontent.fbma5-1.fna.fbcdn.net/v/t1.6435-9/28870185_10215744456110109_4939343953838211072_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=cM58egjGx10AX9TxYEI&tn=LqcIJUAqGIqBwfZ5&_nc_ht=scontent.fbma5-1.fna&oh=00_AfBgt1G7fq-Ooa-HEJI9okiU6n0NyC5YoWMVdLSh1BWSUQ&oe=63EE1AA0" 
    alt="Student posing"></img>
    </div>
    
  </Section> );
}
 
export default StudentPortal;