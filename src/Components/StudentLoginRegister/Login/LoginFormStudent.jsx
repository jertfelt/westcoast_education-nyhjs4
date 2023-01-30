
import { useContext, useState,  useRef, useEffect } from "react";
import StudentContext from "../../../Context/StudentContext";
import { useNavigate} from "react-router-dom";
import Modal from "../../ui/Modal/Modal";
import { FormInstructions as Form } from "../../StylingElements/Form/Form";


const LoginFormStudent = ({studentsDB}) => {
  const context = useContext(StudentContext);
  const navigate = useNavigate()
  const userRef = useRef()
  const [studentEmail, setStudent] = useState("")
  const [studentPassword, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    if(studentsDB){
      setStudents(studentsDB.map(item => item))
      console.log(studentsDB)
    }
  }, [studentsDB])

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const modalFunction = (message) => {
    setShowModal(prev => !prev)
    setErrMsg(message)
  }

  const handleSubmit =  (e) => {
    e.preventDefault()
    let checkForStudent = students.filter(function (student){
      return student.studentEmail === studentEmail}).map(item => item)
      if(checkForStudent.length === 0){
        modalFunction("Användaren finns inte!")
      }
       else{
        let checkPassword = checkForStudent.map(item => {
          return item.studentPassword
        })
        if(studentPassword !== checkPassword[0]){
          modalFunction("Fel lösenord!")
        }
        else{
          let studentLoggedIn = true
          let studentName= checkForStudent.map(item => {
            return item.studentName
          })[0]
          let studentID = Number(checkForStudent.map(item => {
            return item.studentID
          })[0])

         
          let studentCourseFirstChoice = checkForStudent.map(item => {
            return item.studentCourseFirstChoice
          })[0]
          let studentCourseSecondChoice = checkForStudent.map(item => {
            return item.studentCourseSecondChoice
          })[0]
         
          

          // console.log(
          //           "id:",studentID,
          //           studentEmail,
          //           studentName,
          //           studentLoggedIn,
          //           studentID,
          //           studentCourseFirstChoice,
          //           studentCourseSecondChoice,
                    
          // )
         
                  context.onLogin({
                    studentName,
                    studentEmail,
                    studentLoggedIn,
                    studentID,
                    studentCourseFirstChoice,
                    studentCourseSecondChoice,
                  })
                  navigate("/student")
      
        }
       }
    }
     
    

  return (
    <>
    {showModal && <Modal 
    title="Något gick fel!"
    message= {errMsg}
    onClick={() => setShowModal(false)}/>}

    {!studentsDB ? <p>Laddar...</p> : <>

    

    <Form onSubmit={handleSubmit}>
      <h1>Välkommen</h1>
      <div className="Row">
      <label 
      htmlFor="username">
        Email:</label>
        <input
              type="email"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setStudent(e.target.value)}
              value={studentEmail}
              required
        />
      </div>
      <div className="Row">
        <label 
        htmlFor="password">
          Lösenord:</label>
        <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={studentPassword}
              required
            /> 
      </div>
    <input
    className="centered"
    type="submit"
    value="Skicka"/>

  </Form>
  </>}
  </>
    );
}

export default LoginFormStudent;