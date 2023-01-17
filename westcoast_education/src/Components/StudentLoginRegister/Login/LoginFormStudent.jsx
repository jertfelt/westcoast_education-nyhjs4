import styled from "styled-components";
import { useContext, useState,  useRef, useEffect } from "react";
import StudentContext from "../../../Context/StudentContext";
import { useNavigate} from "react-router-dom";
import Modal from "../../ui/Modal/Modal";
import { FormWOInstructions as Form } from "../../StylingElements/Form/Form";
import Button from "../../StylingElements/Buttons/FormButton";
import { useFetch } from "../../utils/useFetch";

const LoginFormStudent = () => {
  const context = useContext(StudentContext);
  const navigate = useNavigate()
  const userRef = useRef()
  const [studentEmail, setStudent] = useState("")
  const [studentPassword, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [showModal, setShowModal] = useState(false)

  const STUDENTS_URL = "http://localhost:8000/students"
  const {data, error, loading} = useFetch(STUDENTS_URL)
  const [studentsEmail, setStudentsEmail] = useState([])

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [studentEmail, studentPassword])

  useEffect(() => {
    const dataFetch = async () => {
      const data2 = await (
        await fetch(
          STUDENTS_URL
        )
      ).json()
      setStudentsEmail(data2)
    }
    dataFetch()
   
  }, [])



  const handleSubmit =  (e) => {
    e.preventDefault()

    //egentligen inte såhär saker ska gå till, det ska användas post till en databas - jag får dock inte till detta utan att det SKAPAS en ny användare oavsett, men för att få en fungerande testing site..
    
  if(studentsEmail.map(student => student.studentEmail).includes(studentEmail)){
   const result = studentsEmail.filter(student => student.studentEmail === studentEmail)

   if(result.map(student => student.studentPassword === studentPassword)){
    let studentName = result.filter(student => student.studentPassword === studentPassword).map(student => student.studentName)
    let studentLoggedIn = true
    context.onLogin({
            studentName,
            studentEmail,
            studentPassword,
            studentLoggedIn
          })
          setStudent("")
          setPassword("")
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