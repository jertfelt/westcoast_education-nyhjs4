import styled from "styled-components";

import { useContext, useState, useRef, useEffect } from "react";
import StudentContext from "../../Context/StudentContext";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
background: ${({ theme }) => theme.toggleBorder};
padding:2rem;
color: ${({ theme }) => theme.text};
h1{
  
  align-self:center;
  font-size:32px;
  line-height:1rem;
}
display:flex;
flex-direction:column;
max-width:300px;
gap:10px;
font-family: Sofia Sans;
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
const Container = styled.div`
display:flex;
gap:6px;
align-items:center;
justify-content:flex-end;
input{
  font-family: Sofia Sans;
  padding:4px;
  width:60%;
  border-color:${({ theme }) => theme.text};
  font-color: ${({ theme }) => theme.text};
}
input[type=password]{
  width:50%;
}
min-width:200px;
width:100%;
`
const Button = styled.input`
border-radius: 30px;
width:100px;
margin-top:1rem;
padding:1rem;
border:none;
font-family: Sofia Sans;
align-self:center;
font-weight:bold;
font-size:14px;
opacity: 0.8;
.enabled{
  opacity: 1;
  cursor:pointer;
}
`

const RegisterStudent = () => {
  const context = useContext(StudentContext);
  const navigate = useNavigate()

  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const matchPasswordInputRef = useRef()

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

  useEffect(() => {
    setMatchFocus(true)
  }, [setMatch])

  const studentUser = {
    studentName, studentEmail,studentPassword
  }

  //*lägg in en if student redan finns så poppar en modal upp med det felmeddelandet:
  const handleSubmit = (e) => {
    e.preventDefault()
    
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
     
      navigate("/register")
  }
  
  


  return (
    <Form 
      onSubmit={handleSubmit}>
        <h1>Registrera dig:</h1>
        <Container>
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
     
      </Container>
      <p className={userFocus && studentName && !validName ? "instructions" : "offscreen"} >Måste börja med en bokstav. 4 - 24 karaktärer behövs.</p>
      <Container>
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
      </Container>
      <Container>
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
     
      </Container>
      <p className={pwdFocus && !validPassword ? "instructions" : "offscreen"} 
      data-testid="testingParagraph">
      Minst 8 karaktärer. Måste innehålla både stora och små bokstäver, minst ett nummer och minst ett specialtecken. Tillåtna tecken är:{""}
      <span aria-label="exclamation mark">
            !
          </span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
          </p>
      <Container>
      <label 
      htmlFor="passwordLoginConfirm">
      Bekräfta lösenord:</label>
      <input 
      type="password"
      id="passwordLoginConfirm"
      value={matchPassword}
      minLength="8"
      required
      onChange={(e) => setMatch(e.target.value)}
      aria-invalid={validMatch? "false": "true"}
      placeholder="Bekräfta lösenord"
      ref={matchPasswordInputRef}
      />
      </Container>
      <p className={
              matchFocus && !validMatch
                ? "instructions"
                : "offscreen"
            }
      >
        Matchar inte första lösenordet!
      </p>
      <Button
      type="submit"
      className={!validMatch ? "disabled" : "enabled"}
      disabled={!validMatch ? true :false}
      value="Registrera"/>
  </Form>
    );
}
 
export default RegisterStudent;