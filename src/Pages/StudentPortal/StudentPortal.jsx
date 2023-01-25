import { useContext, useEffect, useState, useRef } from "react";
import StudentContext from "../../Context/StudentContext";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ProfileSection as Section , ParagraphWithButton, StudentPortalInfo, ButtonDiv} from "../../Components/StylingElements/StudentSections/StudentSections";
import { Line } from "../../Components/StylingElements/Line/Line";
import Timer from "../../Components/Timer/Timer";
import FormModal from "../../Components/ui/Modal/FormModal";
import { useFirebase } from "../../Components/utils/useFirebase";
import Modal from "../../Components/ui/Modal/Modal";
import sendStudentEditToFb from "../../firebase/useSendToFb";

const StudentPortal = () => { 
  const navigate = useNavigate()

  const studentEmailInput = useRef()
  const studentNameInput = useRef()
  const studentPasswordInput = useRef()
  const context = useContext(StudentContext)

  const [studentName, setName] = useState("")
  const [studentEmail, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [studentID, setID] = useState("")

  const [newEmail, setNewEmail] = useState("")
  const [newName, setNewName] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [showNewName, setShowNewName] = useState(false)
  const [showNewEmail, setShowNewEmail] = useState(false)
  
  const [changeNameForm, setChangeNameForm] = useState(false)
  const [changeEmailForm, setChangeEmailForm] = useState(false)
  const [changePasswordForm, setChangePassForm] = useState(false)
  const [courses, setCourses] = useState(true)
  const [firstC, setFirstC] = useState("")

  const [error2, setError] = useState(false)
  const [errmsg, setErrmsg] = useState("")
  const [showModal, setShowModal] = useState(false)

  const {data,error, loading} = useFirebase(`/students/${context.studentID}/studentPassword`)
  
  useEffect(() => {
    setName(context.studentName)
    setEmail(context.studentEmail)
    if(context.studentCourseFirstChoice){
      setFirstC(context.studentCourseFirstChoice)
        if(context.studentCourseFirstChoice === ""){
          setCourses(false)
        }
    }    
    setID(Number(context.studentID))
  }, [context.studentName,context.studentCourseFirstChoice, context.studentEmail, context.studentID])

  useEffect(() => {
    if(data){
      setPassword(data)
    }
    if(error){
      setError(true)
      setErrmsg("Något är fel och vi kan inte nå dina uppgifter via databasen. Prova igen snart!")
    }
  },[data,error])

const handleNameSubmit = (e) => {
  e.preventDefault()
  setNewName(studentNameInput.current.value)
  console.log(newName, "newName")
  setShowNewName(true)
  setChangeNameForm(false)
}

const handleEmailSubmit = (e) => {
  e.preventDefault()
  setNewEmail(studentEmailInput.current.value)
  setShowNewEmail(true)
  setChangeEmailForm(false)
}

const handlePasswordSubmit = (e) => {
  e.preventDefault()
  setNewPassword(studentPasswordInput.current.value)
  setChangePassForm(false)
  
}
const contextFunction = (
  studentID, 
  studentName,
  studentLoggedIn,
  studentEmail,
  studentCourseFirstChoice) => {

  context.onUpdate({
    studentID,
    studentName,
    studentLoggedIn,
    studentEmail,
    studentCourseFirstChoice,
  })
  }

const checkForChangesAndSave = (e) => {
  e.preventDefault()
  // console.log(
  //   "email:", newEmail,
  //   "name:", newName,
  //   "newpassword:" , newPassword,
  //   "oldpassword:", password
  // )
  if(!newEmail){
    console.log("no new email")
    setNewEmail(studentEmail)
  }
  else if(!newName){
    console.log("no new name")

    setNewName(studentName)
  }
  else if(!newPassword){
    console.log("no new pass")
    setNewPassword(password)
  }
  let courses = {courseName : firstC,
    courseName2nd:  ""}

let referenceURL = "/students/" + studentID
console.log("reference:", referenceURL)
let studentLoggedIn = true
let studentCourseFirstChoice = firstC

sendStudentEditToFb(
courses,
newEmail,
studentID,
newName,
newPassword,
referenceURL
)

contextFunction(
studentID, 
studentName,
studentLoggedIn,
studentEmail,
studentCourseFirstChoice
)
navigate("/student")
setShowModal(true)


}
  
  return ( 
  <Section 
  data-testid="studentportal">
    {error2 && <h2>{errmsg}</h2>}
    {loading && <h2>Laddar...</h2>}
    {showModal && <Modal
    title="Klart!"
    message="Ändringar sparade"
    onClick={() => setShowModal(false)}
    ></Modal>}
    <div>
      <div className="Row-reverse">
    <img src="https://picsum.photos/100/100" 
    alt="Placeholder from Lorem Picsum."/>
    <h1>Välkommen, {context.studentName}</h1>
    </div>
    
    <h2>Dina uppgifter:</h2>
    <StudentPortalInfo>
      
    <ParagraphWithButton 
          data-testid="paragraph">
           {showNewName ? <p> <strong>Namn:</strong> {newName}</p>:<p> <strong>Namn:</strong> {studentName}</p>}
          <button 
          onClick={() => setChangeNameForm(true)} 
          data-testid="changeParagraph">
            Ändra</button>
    </ParagraphWithButton>
    <ParagraphWithButton 
          data-testid="paragraph">
          {showNewEmail ? <p> <strong>Email:</strong> {newEmail}</p>:<p> <strong>Email:</strong> {studentEmail}</p>}
          <button 
          data-testid="changeParagraph"
          onClick={() => setChangeEmailForm(true)} 
          >
          Ändra</button>
    </ParagraphWithButton>
    

    {changePasswordForm &&
    <FormModal
    onSubmit={(e) => handlePasswordSubmit(e)}
    reference= {studentPasswordInput}
    default= ""
    inputType = {"password"}
    onClick={() => setChangePassForm(false)}
    />}
    
    {changeEmailForm && <FormModal
          onSubmit={(e) => handleEmailSubmit(e)}
          reference= {studentEmailInput}
          default= {studentEmail}
          inputType = {"email"}
          onClick={() => setChangeEmailForm(false)}
    />}
  
    {changeNameForm && <FormModal
          onSubmit={(e) => handleNameSubmit(e)}
          reference= {studentNameInput}
          default= {studentName}
          inputType = {"text"}
          onClick={() => setChangeNameForm(false)}
    />}
    <ButtonDiv>
    <button 
    data-testid="changeParagraph"
    onClick={() => setChangePassForm(true)}>Byt lösenord</button>    
    <button onClick={(e) => checkForChangesAndSave(e)}>Spara alla ändringar</button>
    </ButtonDiv>
    </StudentPortalInfo>
    <Line/>
    <h2>Vald kurs:</h2>
    <div>
    {context.studentCourseFirstChoice && <p>{context.studentCourseFirstChoice}</p>}
    {!context.studentCourseFirstChoice  && <p>Du har inte anmält dig till någon kurs än!</p>} 
    <HashLink smooth to ="/#kurser">
      Se alla publicerade kurser här</HashLink><br/>
    <Link to="/student/student-kurser/register">{!courses ? "Anmäl dig till en kurs här":"Ändra kurser"}
    </Link><br/>
    <Line/>
    <button className="logoutBtn" 
    onClick={context.onLogout}>Logga ut</button>
   
    </div>
    </div>

   
  </Section> );
}
 
export default StudentPortal;