import styled from "styled-components";
import axios from "axios";
import { useContext, useState,  useRef, useEffect } from "react";
import StudentContext from "../../../Context/StudentContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal/Modal";


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
  const navigate = useNavigate();
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [studentEmail, setUser] = useState("")
  const [studentPassword, setPassword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(
        "http://localhost:8000/students",
        JSON.stringify({studentEmail, studentPassword}),{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      context.onLogin({
        studentEmail,
        studentPassword,
      })
      navigate("/register")
    }catch(err){
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  }




  return (
    <>
    {showModal && <Modal/> }
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