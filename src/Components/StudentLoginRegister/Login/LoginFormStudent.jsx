
import { useContext, useState,  useRef, useEffect } from "react";
import StudentContext from "../../../Context/StudentContext";
import { useNavigate} from "react-router-dom";
import Modal from "../../ui/Modal/Modal";
import { FormInstructions as Form } from "../../StylingElements/Form/Form";
import { useFirebase } from "../../utils/useFirebase";

const LoginFormStudent = () => {
  const context = useContext(StudentContext);
  const navigate = useNavigate()
  const userRef = useRef()
  const [studentEmail, setStudent] = useState("")
  const [studentPassword, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [showModal, setShowModal] = useState(false)

  const {data, error, loading} = useFirebase("/students")
  const [students, setStudents] = useState([])

  useEffect(() => {
    if(data){
      setStudents(data.map(item => item))
    }
  }, [data])

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
          let studentName = checkForStudent.map(item => {
            return item.studentName
          })
          let courses =  checkForStudent.map(item => {
            return item.courses
          })
                  context.onLogin({
                    studentName,
                    studentEmail,
                    studentLoggedIn,
                    courses,
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

    {loading ? <p>Laddar...</p> : <>

    {error && <Modal 
    title="Något gick fel!"
    message= "Prova att refresha sidan eller återkom om ett tag. Om problemet kvarstår, kontakta administratören."
    onClick={() => setShowModal(false)}/>}

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