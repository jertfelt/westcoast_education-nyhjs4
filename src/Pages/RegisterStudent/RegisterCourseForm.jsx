import { useState, useRef, useContext, useEffect} from "react";
import StudentContext from "../../Context/StudentContext";
import { FormInstructions } from "../../Components/StylingElements/Form/Form";
import {IfAlreadyExists, StudentContainer, TwoColumns} from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";
import { getDatabase,  ref, set, } from "firebase/database";
import { useNavigate } from "react-router-dom";


const RegisterCourseForm = ({ ifDirected, studentid, item, course1, course2}) => {
  const navigate = useNavigate()
  const context = useContext(StudentContext);
  const [validInputs, setValidInputs] = useState(false)
  const courseInputRef = useRef()
  const courseInputRef2 = useRef()
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const {data, error, loading} = useFirebase("/courses")
  const [firstChoice, setFirst] = useState("")
  const [newSecondChoice, setNewSecond] = useState("Ingen")
  const [secondChoice, setSecond] = useState("")
  const [warning, setWarning] = useState(false)
  const [idToDB, setIDToDB] = useState(studentid)
 

useEffect(() => {
  if(data){
    if(studentid === "" ||!studentid){
      setIDToDB(item.map(i => i.studentID)[0])
    }
  }
  
},[data, item, studentid])


const sendEditToFb = (
    firstChoiceNew,
    secondChoiceNew,
    studentEmail,
    idToDB,
    studentName,
    studentPassword
  ) => {
  const db = getDatabase()
  const courseRef = ref(db, "/students/" + idToDB );

  set(courseRef,{
    studentID: idToDB,
    studentName : studentName,
    studentEmail: studentEmail,
    studentPassword : studentPassword,
    studentCourseFirstChoice : firstChoiceNew,
    studentCourseSecondChoice : secondChoiceNew
  })
  const studentID = idToDB;
  let studentLoggedIn = true
  let studentCourseFirstChoice = firstChoiceNew
  let studentCourseSecondChoice = secondChoiceNew
  context.onAddingCourses({
    studentID,
    studentName,
    studentLoggedIn,
    studentEmail,
    studentCourseFirstChoice,
    studentCourseSecondChoice,
  })
    navigate("/student")
  
}
 
const onSubmit = (e) => {
  e.preventDefault()
  
const firstChoiceNew = courseInputRef.current.value
let secondChoiceNew = ""
const studentName = context.studentName
  if(newSecondChoice === "Välj" || newSecondChoice === "Ingen"){
    if(!secondChoice || secondChoice !== "Ingen" )
      {secondChoiceNew = secondChoice;}
    else{secondChoiceNew = "Ingen"}
  }
  else{
    secondChoiceNew = courseInputRef2.current.value
  }

  sendEditToFb(
    firstChoiceNew,
    secondChoiceNew,
    studentEmail,
    idToDB,
    studentName,
    studentPassword
  )
  
  
}



const checkInputsFirstChoice = (e) => {
  e.preventDefault()
  if(e.target.value !== "Välj:"){
    setWarning(true)
    if(e.target.value !== courseInputRef2.current.value){
      setValidInputs(true)
    }
    else{
      setNewSecond("Ingen")
    }
    
  }
  else{
    setValidInputs(false)
  }
}

const checkInputsSecondChoice = (e) => {
  e.preventDefault()
  setWarning(true)
  if(e.target.value !== courseInputRef.current.value){
    if(e.target.value !== "Välj" || e.target.value !== "Ingen"){
      setNewSecond(courseInputRef2.current.value)
    }
  }
  else{
    setNewSecond("Ingen")
  }
  
}

useEffect(() => {
  if(item){
  
  
    setStudentPassword(item.map(i=> i.studentPassword)[0])
    if(context){
      setStudentEmail(context.studentEmail)
      console.log("grabbed from context")
    }
    else{
      setStudentEmail(item.map(i => i.studentEmail)[0])
    }
    
  }
  if(course1){
    setFirst(course1[0])
  }
  if(course2){
    setSecond(course2[0])
  }
  
}, [item,course2, context, course1])

// const newPrio =(string, e) =>{
//   e.preventDefault()
//   if(string === "1"){
    
//   }
// }



  return ( 
  <StudentContainer>
    <FormInstructions
    onSubmit={onSubmit}>
    <h1 data-testid ="welcome">Hej igen {context.studentName}</h1>
    {loading ? <h2> Laddar... </h2> : <>
    {error && <h2> Något är fel på databasen</h2>}
    {firstChoice && <> 
    <IfAlreadyExists>
    <h2>Du är anmäld till :</h2>
    <TwoColumns
    largergap>
    <div>
    <h3>#1: {firstChoice} </h3>
    {data && data.filter(function (i){
            return i.courseName !== "DELETED"}).filter(function (course){return course.courseName === firstChoice}).map((item, indx) => (
              <div key={`${indx}-${item}-${firstChoice}`}>
                <p>Start: {item.startDate}</p>
                <p>Längd i veckor: {item.lengthWeeks} </p>
                <p>Lärare: {item.teacherAssigned}</p>
                {/* <button onClick={(e) => newPrio("2",e)}>Byt till prio #2</button> */}
                </div>
                ))}
    </div>
    {secondChoice && <>
    <div>
    <h3>#2: {secondChoice}</h3>
    {data && data.filter(function (i){
            return i.courseName !== "DELETED"}).filter(function (course){return course.courseName === secondChoice}).map((item, indx) => (
              <div key={`${indx}-${item}-${firstChoice}`}>
                <p>Start: {item.startDate}</p>
                <p>Längd i veckor: {item.lengthWeeks} </p>
                <p>Lärare: {item.teacherAssigned}</p>
                {/* <button onClick={(e) => newPrio("1",e)}>Byt till prio #1</button> */}
                </div>))}
                
    </div>
    </>}
    </TwoColumns>
    </IfAlreadyExists>
    </>}
    <TwoColumns
    largergap>
    <div className="Row">
      
      <label htmlFor="firstChoice">
        Kursval 1:</label>
      <select 
      id="firstChoice"
      data-testid="studentcours1"
      ref={courseInputRef}
      required
      onChange={(e) => checkInputsFirstChoice(e)}
      >
        {ifDirected && <><option value={ifDirected} data-testid="optionDefault2"
        label={ifDirected}/>
        {ifDirected && data.filter(function (i){
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
     
      

      <div className="Row">
      <label htmlFor="secondChoice">
        **Kursval 2:</label>
      <select id="secondChoice" 
      ref={courseInputRef2}
      data-testid="studentcourse2"
      onChange={(e) => checkInputsSecondChoice(e)}
      >
      <option 
      value="Välj:" 
      name="Välj:"
      label="Välj:"/>
        {data && data.filter(function (i){
            return i.courseName !== "DELETED"}).map(item => ( 
            <option key={item.courseID} 
            value={item.courseName}>
              {item.courseName}</option>)
        )}
      <option 
        value="Ingen"
        name="Ingen"
        label="Ingen"/>
      </select>
      </div>
      </TwoColumns>
      <p className="instructions">
        ** Detta är inte obligatoriskt för att du ska kunna anmäla dig, men det kan vara bra att ha en back-up.</p>
        {warning && !item.published && <><p className="warning">OBS! Kursen du valt är inte publicerad ännu, det behövs vara minst fem studenter anmälda. <br/>Vi hör av oss i god tid till din mail innan om ditt val inte startar.</p>
        </>
        }
      <input
      className={validInputs ? "enabled" :"disabled"}
      type="submit"
      value="Skicka"
      />
      
      </>} 

    </FormInstructions>
  </StudentContainer> );
}
 
export default RegisterCourseForm ;