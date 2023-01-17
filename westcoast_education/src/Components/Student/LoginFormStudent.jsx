import styled from "styled-components";
import { useFetch } from "../utils/useFetch";
import { useContext, useState,  useRef, useEffect } from "react";
import StudentContext from "../../Context/StudentContext";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal/Modal";
import { M } from "msw/lib/SetupApi-b2f0e5ac";


const Form = styled.form`
display:flex;
flex-direction:column;
max-width:600px;
gap:4px;
input{
  padding:4px;
}
.instructions{
  font-size:12px;
}
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

const LoginFormStudent = () => {
  const context = useContext(StudentContext);
  
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [studentEmail, setUser] = useState("")
  const [studentPassword, setPassword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()

  // const {data,loading,error} = useFetch("http://localhost:8000/students")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch("http://localhost:8000/students", {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentPassword: passwordInputRef.current.value,
      studentEmail: emailInputRef.current.value,
    }),
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.error){
        setErrMsg("Fel lösenord eller användarnamn")
        setShowModal(true)
      }
      else{
        navigate("/student")
      }
    })
  
 
      // if(data.filter(function (item){return item.studentEmail === studentEmail})){
      //   console.log(data.filter(function (item){return item.studentEmail === studentEmail}))
      //   // context.onLogin({
      //   //   studentEmail,
      //   //   studentPassword,
      //   // })
      //   // navigate("/student")
      // }
      // else{
      //   console.log("fel")
      //     setErrMsg("Något har gått fel, försök igen")
      //     setShowModal(true)
      // }  
  }

  return (
    <>
    {showModal && <Modal 
    title="Något gick fel!"
      message={errMsg}
      onClick={() => setShowModal(false)}/> }

    <Form onSubmit={handleSubmit}>
       <label htmlFor="username">
        Email:</label>
            <input
              type="email"
              id="username"
              ref={emailInputRef}
              onChange={(e) => setUser(e.target.value)}
              value={studentEmail}
              required
            />
      <label htmlFor="password">
        Lösenord</label>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              onChange={(e) => setPassword(e.target.value)}
              value={studentPassword}
              required
            />
            <input type="submit"
            value="Logga in"/>
  </Form>

  </>
    );
}

export default LoginFormStudent;