import { useState, useRef, useContext, useEffect} from "react";
import StudentContext from "../../Context/StudentContext";
import { FormInstructions } from "../../Components/StylingElements/Form/Form";
import {ColumnTwo, IfAlreadyExists, Introduction, Show, StudentContainer, TwoColumns} from "../../Components/StylingElements/StudentSections/StudentSections";
import { useNavigate } from "react-router-dom";
import sendStudentEditToFb, { decrementCoursesByStudent, incrementCoursesByStudent } from "../../firebase/useSendToFb";
import ShowInfo from "./ShowInfo";
import Modal from "../../Components/ui/Modal/Modal";
import { GobackButton } from "../../Components/StylingElements/Buttons/MenuButton";
import { useLayoutEffect } from "react";

const RegisterCourseForm = ({ ifDirected, studentid, item, course1, allCourses}) => {
  const navigate = useNavigate()
  const context = useContext(StudentContext);
  const [validInputs, setValidInputs] = useState(false)
  const courseInputRef = useRef()
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const data = allCourses;
  const [firstChoice, setFirst] = useState("")
  const [warning, setWarning] = useState(false)
  const [showModal3, setShowModal3] = useState(false)
  const [titleModal, setTitle] = useState("")
  const [messageModal, setMessage] = useState("")
  const [showCourseInfo, setShowCourseInfo ]= useState(false)
  const [noFirst, setNoFirst] = useState(false)
  const [current, setCurrent] = useState("")

useEffect(() =>{
  if(ifDirected){   
    setShowCourseInfo(true)
  }
},[ifDirected])
useEffect(() => {
  if(item){
    setStudentPassword(item.map(i=> i.studentPassword)[0])
    if(context){
      setStudentEmail(context.studentEmail)
    }
    else{
      setStudentEmail(item.map(i => i.studentEmail)[0])
    }
    let oldFirstChoice = item.map(item => item.courses).map(j => j.courseName).toString()
    if(oldFirstChoice){ 
      setFirst(oldFirstChoice)
    }
    else {
      setFirst("")
    }
  }

  
}, [item,context, course1])


useEffect(() => {
  if(firstChoice){
    setNoFirst(false)
  }else{
    setNoFirst(true)
  }
},[firstChoice])

const contextFunction = (
  studentID, 
  studentName,
  studentLoggedIn,
  studentEmail,
  studentCourseFirstChoice) => {

  context.onAddingCourses({
    studentID,
    studentName,
    studentLoggedIn,
    studentEmail,
    studentCourseFirstChoice,
  })
  }

const filterNames = (name) => {
  let test = data.filter(function (i){
    return i.courseName !== "DELETED"}).filter(function (course){
      return course.courseName === name
  }).map(item => item)
  return test
}
const prepareData = (newName, studentName, newEmail, newPassword, courses, studentID, studentLoggedIn, referenceURL) => {
  if(!firstChoice){
    let chosen1 = data.filter(function (i){
      return i.courseName !== "DELETED"})
      .filter(function (course){
        return course.courseName === current})
      .map(item => item)

    let newID= Number(chosen1.map(item => item.courseID))
    let courseID2 = newID
    incrementCoursesByStudent(
      courseID2, 
    )
  }
  else{

    let chosen1 = filterNames(firstChoice)
    let oldID = Number(chosen1.map(item => item.courseID))
    let courseID1 = oldID
    let chosenNew = filterNames(current)
    let newID = Number(chosenNew.map(item => item.courseID))
    let courseID2 = newID
  
    incrementCoursesByStudent(
      courseID2, 
    )
    decrementCoursesByStudent(
      courseID1
    )
  }
  sendStudentEditToFb(
    courses,
    newEmail,
    studentID,
    newName,
    newPassword,
    referenceURL
  )
  let studentCourseFirstChoice = current
  contextFunction(
      studentID, 
      studentName,
      studentLoggedIn,
      studentEmail,
      studentCourseFirstChoice
  )
  setShowModal3(true)
    setTitle("Uppdaterat")
    setMessage("Nu är ditt val av kurs ändrat.")
    navigate("/student")
}

const onSubmit = (e) => {
  e.preventDefault()
    const newName = context.studentName
    let studentName = newName
    let newEmail = studentEmail
    let newPassword = studentPassword
    let courses = {courseName : current, courseName2nd:  ""}
    const studentID = studentid
    let studentLoggedIn = true
    let referenceURL = "/students/" + studentid
    prepareData(newName, studentName, newEmail, newPassword, courses, studentID, studentLoggedIn, referenceURL)
}



const checkIfNotPublished = (value) => {
let published = (data.filter(function (item) {
  return item.courseName !== "DELETED"
}).filter(function (notDeleted){
  return notDeleted.published === true
}).map(item => item))

published.forEach(array => {
  if(array.courseName === value){
    setWarning(false)}
})

let notPublished = (data.filter(function (item) {
  return item.courseName !== "DELETED"
}).filter(function (notDeleted){
  return notDeleted.published !== true
}).map(item => item))

notPublished.forEach(array => {
  if(array.courseName === value){
    setWarning(true)
  }
}
)
}

const checkInputsFirstChoice = (e) => {
  e.preventDefault()
  if(setShowCourseInfo){
    setShowCourseInfo(false)
  }
  checkIfNotPublished(e.target.value)
  if(e.target.value !== "Välj:"){
    setCurrent(e.target.value)
    setValidInputs(true)
    setShowCourseInfo(true)
}}
useLayoutEffect(() => {
})

  return ( 
  <StudentContainer>
    {showModal3 && <Modal
    title={titleModal}
    message={messageModal}
    onClick = {() => setShowModal3(false)}
    />}
    <Introduction>
    {!data && <h2>Laddar...</h2>}
    <h1 data-testid ="welcome">Välkommen {context.studentName}</h1>
    <TwoColumns>
    {data && <div>
      {!noFirst && 
      <IfAlreadyExists>
        {data && data.filter(function (i){
            return i.courseName !== "DELETED"})
            .filter(function (course){return course.courseName === firstChoice})
            .map((item, indx) => (
            <div className="exists"
            key={`${indx}-${item.courseID}-${indx}${indx}-${indx}`}>
              <h3>Du {!showCourseInfo ? "är": "var"} anmäld till:<br/>{item.courseName}</h3>
              <ShowInfo 
                courses = {item}/>
            </div>
        ))}
      </IfAlreadyExists>
    }</div>} 
    {noFirst && 
    <IfAlreadyExists >
        <h3>Anmäl dig till kurser!</h3>
          <p> Alla våra utbildningar ges på distans i vår digitala kursportal. Du kan befinna dig var som helst, webbutbildning när du har tid. </p>
      </IfAlreadyExists>}
    </TwoColumns>
  </Introduction>
  <TwoColumns>
    <FormInstructions
    studentCourses
    onSubmit={onSubmit}>
      {showCourseInfo && 
      <IfAlreadyExists>
      <h3>Nytt val:</h3>
      {data && data.filter(function (i){
        return i.courseName !== "DELETED"})
        .filter(function (course){return course.courseName === current})
        .map((item, indx) => (
        <ShowInfo 
        key={`${indx}-3333-${indx}${indx}-${indx}`}
        courses = {item}
        />))}
    </IfAlreadyExists>}

        <div className="selecting">
      <label htmlFor="firstChoice">
        Välj ny kurs här:</label>
      <select 
      id="firstChoice"
      data-testid="studentcours1"
      ref={courseInputRef}
      required
      onChange={(e) => checkInputsFirstChoice(e)}
      >
        {ifDirected && <>
        <option 
        value={ifDirected} 
        data-testid="optionDefault2"
        label={ifDirected}/>
        
        {ifDirected && data && data.filter(function (i){
            return i.courseName !== "DELETED"
          }).filter(j => {
            return j.courseName !== ifDirected
          })
          .map(item => ( 
        <option 
        value={item.courseName}
        key={item.courseID}>
        {item.courseName}
        
        </option>)
        )}
        </>}
        {!ifDirected && <> 
        
        <option 
        value="Välj:" 
        data-testid="optionDefault"
        label="Välj:"/>

        {data && data.filter(function (i){
            return i.courseName !== "DELETED"
          }).map(item => ( 
        <option 
        value={item.courseName}
        key={item.courseID}>
        {item.courseName}
        
        </option>)
        )}
        </>}
      </select>
      </div> 
     
    
    {!warning && 
        <input
      className={validInputs ? "enabled" :"disabled"}
      type="submit"
      value="Skicka"
      />
    }
    </FormInstructions>

    <ColumnTwo>
    <div>
    <h3>Bra att veta:</h3>
    <p>När du har bokat en kurs så kommer vi skicka ett bekräftelsemejl med betalningsuppgifter och ett välkomstmeddelande. Skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste vi tyvärr av ekonomiska skäl boka av kursen. </p>
    </div>
  </ColumnTwo>
  </TwoColumns>
   <GobackButton 
              onClick={() => navigate(-1)}>Gå tillbaka</GobackButton>
      {warning && !item.published && <Modal
      title="OBS"
      message="Kursen du valt är inte publicerad ännu, det behöver vara minst fem studenter anmälda. Du får fortfarande anmäla dig till kursen, men skulle det vara så att 3 veckor före kursstart vi inte har fler än 5 deltagare anmälda så måste vi tyvärr av ekonomiska skäl boka av kursen. " 
      onClick={() => setWarning(false)}/>
    }
  </StudentContainer> );
}
 
export default RegisterCourseForm ;