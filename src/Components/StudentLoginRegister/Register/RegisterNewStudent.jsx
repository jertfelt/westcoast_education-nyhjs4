import styled from "styled-components";
import { useContext, useState, useRef, useEffect } from "react";
import StudentContext from "../../../Context/StudentContext";
import { useNavigate } from "react-router-dom";
import { FormInstructions as Form } from "../../StylingElements/Form/Form";
import Button from "../../StylingElements/Buttons/FormButton";

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

  const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    setValidName(USER_REGEX.test(studentName));
  }, [studentName, USER_REGEX]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(studentPassword));
    setValidMatch(studentPassword === matchPassword);
  }, [studentPassword, matchPassword, PWD_REGEX]);

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
      let studentLoggedIn = true
      context.onLogin({
        studentEmail,
        studentLoggedIn,
        studentName,
        studentPassword
      })
     
      navigate("/student")
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
      data-testid="Submitbtn"
      className={!validMatch ? "disabled" : "enabled"}
      disabled={!validMatch ? true :false}
      value="Registrera"/>
  </Form>
    );
}
 
export default RegisterStudent;