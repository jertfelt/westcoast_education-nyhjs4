import styled from "styled-components";
import { useContext, useState, useRef, useEffect } from "react";
import StudentContext from "../../../Context/StudentContext";
import { useNavigate } from "react-router-dom";
import { FormInstructions as Form } from "../../StylingElements/Form/Form";
import Modal from "../../ui/Modal/Modal";
import Button from "../../StylingElements/Buttons/FormButton";
import { useDates } from "../../utils/useDates";
import sendStudentEditToFb from "../../../firebase/useSendToFb";


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


const RegisterStudent = ({studentsDB}) => {
  const context = useContext(StudentContext);
  const navigate = useNavigate()
  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const matchPasswordInputRef = useRef()
  const {nextYear} = useDates()
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
  const [allstudents, setAllstudents] = useState("")
  const [id, setID] = useState(nextYear)
  const [showModal2, setShowModal2] = useState(false)
  const [modalTitle, setTitle] = useState("")
  const [modalMsg, setMsg] = useState("")

  useEffect(() => {
    if(studentsDB){
      setAllstudents(studentsDB.map(item =>item))
      if(studentsDB.filter(function (student){ 
        return student.studentID === studentsDB.length}) !== 0){
          setID(studentsDB.length)
        }
        else{
          setID(studentsDB.length+2)
        }
    }
    
  },[setID, studentsDB])

  
 

  useEffect(() => {
    const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    setValidName(USER_REGEX.test(studentName));
  }, [studentName]);

  useEffect(() => {
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    setValidPassword(PWD_REGEX.test(studentPassword));
    setValidMatch(studentPassword === matchPassword);
  }, [studentPassword, matchPassword]);

  useEffect(() => {
    setMatchFocus(true)
  }, [setMatch])





  const login = (
    studentName,
    studentEmail,
    studentID,
    studentLoggedIn,
    studentCourseFirstChoice,
    ) => {
    
    context.onLogin({
      studentName,
      studentEmail,
      studentID,
      studentLoggedIn,
      studentCourseFirstChoice,
    })
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const studentName = nameInputRef.current.value
    const studentEmail = emailInputRef.current.value
    const studentID = id
    const studentPassword = passwordInputRef.current.value
    let courses = {courseName : "",
          courseName2nd:  ""}
    let referenceURL = "/students/" + studentID
    let studentCourseFirstChoice = ""
    let studentLoggedIn = true

    let checkForStudent = allstudents.filter(function (student){
      return student.studentEmail === studentEmail}).map(item => item)
      
      if(checkForStudent.length >= 1){
        setShowModal2(true)
        setTitle("Fel!")
        setMsg("Anv??ndaren ??r redan registrerad")
      }
      else{
        sendStudentEditToFb(
          courses,
          studentEmail,
          studentID,
          studentName,
          studentPassword,
          referenceURL,
        )
  
        login( 
            studentName,
            studentEmail,
            studentID,
            studentLoggedIn,
            studentCourseFirstChoice,
            )
        
        navigate("/student")
      }
  }
  
  


  return (
   
    <Form 
      onSubmit={handleSubmit}>
      {showModal2 && <Modal
      title={modalTitle}
      message={modalMsg}
      onClick={() => setShowModal2(false)}
      />}
        <h1>Registrera dig:</h1>
        <Container>
      <label htmlFor="username">
        Anv??ndarnamn:</label>
      <input 
      type="text"
      value={studentName}
      id="username"
      placeholder="Anv??ndarnamn"
      ref={nameInputRef}
      onChange={(e) => setUsername(e.target.value)}
      aria-invalid={validName ? "false": "true"}
      onFocus={() => setUserFocus(true)}
      onBlur={() => setUserFocus(false)}
      />
     
      </Container>
      <p className={userFocus && studentName && !validName ? "instructions" : "offscreen"} >M??ste b??rja med en bokstav. 4 - 24 karakt??rer beh??vs.</p>
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
        L??senord:</label>

      <input 
      type="password"
      id="passwordLogin"
      value={studentPassword}
      minLength="8"
      required
      onChange={(e) => setPassword(e.target.value)}
      placeholder="L??senord"
      ref={passwordInputRef}
      aria-invalid={validPassword ? "false": "true"}
      onFocus={() => setPwdFocus(true)}
      onBlur={() => setPwdFocus(false)}
      />
      </Container>
      <p className={pwdFocus && !validPassword ? "instructions" : "offscreen"} 
      data-testid="testingParagraph">
      Minst 8 karakt??rer. M??ste inneh??lla b??de stora och sm?? bokst??ver, minst ett nummer och minst ett specialtecken. Till??tna tecken ??r:{""}
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
      Bekr??fta l??senord:</label>
      <input 
      type="password"
      id="passwordLoginConfirm"
      value={matchPassword}
      minLength="8"
      required
      onChange={(e) => setMatch(e.target.value)}
      aria-invalid={validMatch? "false": "true"}
      placeholder="Bekr??fta l??senord"
      ref={matchPasswordInputRef}
      />
      </Container>
      <p className={
              matchFocus && !validMatch
                ? "instructions"
                : "offscreen"
            }
      >
        Matchar inte f??rsta l??senordet!
      </p>
      <Button
      type="submit"
      data-testid="Submitbtn"
      className={!validMatch ? "disabled" : "enabled"}
      disabled={!validMatch ? true :false}
      value="Skicka"/>
  </Form>
    );
}
 
export default RegisterStudent;