import styled from "styled-components";

import { useContext, useState, useRef, useEffect } from "react";
import StudentContext from "../../Context/StudentContext";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils/useFetch";


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
const RegisterStudent = () => {
  const context = useContext(StudentContext);
  const navigate = useNavigate()

  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [studentName, setUsername] = useState('');
  const [studentEmail, setEmail] = useState('')
  const [studentPassword, setPassword] = useState('');
  const [matchPassword, setMatch] = useState('') 
  const [validMatch, setValidMatch] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("")
  const [showModal, setShowModal] = useState(false)

  const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    setValidName(USER_REGEX.test(studentName));
  }, [studentName]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(studentPassword));
    setValidMatch(studentPassword === matchPassword);
  }, [studentPassword, matchPassword]);




  const studentUser = {
       studentName, studentEmail,studentPassword
  }
  const {data,loading,error} = useFetch("http://localhost:8000/students")

  async function handleSubmit (e) {
    e.preventDefault()
      
      if(data.filter(function (item){return item.studentEmail === studentEmail})){
        setShowModal(true)
        setErrMsg("Emailadressen finns redan")
      }
      else{
        
      fetch("http://localhost:8000/students", {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentUser)
      })
      context.onLogin({
        studentEmail,
        studentName,
        studentPassword
      })
    }
      navigate("/student")
  }
  
  


  return (
    <Form 
      onSubmit={handleSubmit}>
      <label htmlFor="username">
        Användarnamn:</label>
      <input 
      type="text"
      value={studentName}
      id="username"
      placeholder="Användarnamn"
      ref={nameInputRef}
      onChange={(e) => setUsername(e.target.value)}
      aria-invalid={validName ? "false": "true"}
      onFocus={() => setUserFocus(true)}
      onBlur={() => setUserFocus(false)}
      />
      <p className={userFocus && studentName && !validName ? "instructions" : "offscreen"} >Måste börja med en bokstav. 4 - 24 karaktärer behövs.</p>
      
      <label 
      htmlFor="emailLogin">
      Email:</label>
      <input 
      value={studentEmail}
      type="email"
      id="emailLogin"
      placeholder="Email"
      ref={emailInputRef}
      onChange={(e) => setEmail(e.target.value)}
      />

      <label 
      htmlFor="passwordLogin">
        Lösenord:</label>
      <input 
      type="password"
      id="passwordLogin"
      value={studentPassword}
      minLength="8"
      required
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Email"
      ref={passwordInputRef}
      aria-invalid={validPassword ? "false": "true"}
      onFocus={() => setPwdFocus(true)}
      onBlur={() => setPwdFocus(false)}
      />
      <p className={pwdFocus && !validPassword ? "instructions" : "offscreen"} >
      Minst 8 karaktärer. Måste innehålla både stora och små bokstäver, minst ett nummer och minst ett specialtecken. Tillåtna tecken är:{""}
      <span aria-label="exclamation mark">
            !
          </span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
          </p>
      <label 
      htmlFor="passwordLoginConfirm">
      Bekräfta lösenord::</label>
      <input 
      type="password"
      id="passwordLoginConfirm"
      value={matchPassword}
      minLength="8"
      required
      onChange={(e) => setMatch(e.target.value)}
      aria-invalid={validMatch? "false": "true"}
      placeholder="Email"
      ref={passwordInputRef}
      />
      <p className={
              matchFocus && !validMatch
                ? "instructions"
                : "offscreen"
            }
      >
        Matchar inte första lösenordet!
      </p>
      
      <input 
      type="submit"
      disabled={!validMatch ? true :false}
      value="Registrera"/>
  </Form>
    );
}
 
export default RegisterStudent;