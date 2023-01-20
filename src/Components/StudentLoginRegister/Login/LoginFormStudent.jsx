
import { useContext, useState,  useRef, useEffect } from "react";
import StudentContext from "../../../Context/StudentContext";
import { useNavigate} from "react-router-dom";
import Modal from "../../ui/Modal/Modal";
import { FormWOInstructions as Form } from "../../StylingElements/Form/Form";
import Button from "../../StylingElements/Buttons/FormButton";

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
  const [studentsEmail, setStudentsEmail] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    if(data){
      setStudent(data.map(item => item))
    }
  }, [])

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [studentEmail, studentPassword])



  const handleSubmit =  (e) => {
    e.preventDefault()
    
    if(students.map(item => item.studentEmail).includes(studentEmail)){
      const result = students.filter(student => student.studentEmail === studentEmail)
      if(result.map(student => student.studentPassword === studentPassword)){
        let studentName = result.filter(student => student.studentPAssword === studentPassword).map(student => student.studentName)
        let studentLoggedIn = true
        context.onLogin({
                    studentName,
                    studentEmail,
                    studentPassword,
                    studentLoggedIn
                  })
                  navigate("/student")
      }
      else{
        setShowModal(true)
         setErrMsg("Fel lösenord!")
          }
    }
      
  else{
    setShowModal(true)
    setErrMsg("Användaren finns inte!")
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
      
      <label htmlFor="username">Email:</label>
        <input
              type="email"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setStudent(e.target.value)}
              value={studentEmail}
              required
        />
      <label htmlFor="password">Lösenord:</label>
        <input
          type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={studentPassword}
              required
            />  
    <Button
    type="submit"
    value="Logga in"/>
  </Form>
  </>}
  </>
    );
}

export default LoginFormStudent;