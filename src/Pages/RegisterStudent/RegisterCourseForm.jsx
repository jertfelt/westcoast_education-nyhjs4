import { useState, useRef, useContext, useEffect} from "react";
import StudentContext from "../../Context/StudentContext";
import { FormInstructions } from "../../Components/StylingElements/Form/Form";
import Button from "../../Components/StylingElements/Buttons/FormButton";
import {IfAlreadyExists, StudentContainer, TwoColumns} from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";


const RegisterCourseForm = ({studentid, item, coursesInDB}) => {
  const context = useContext(StudentContext);
  const [validInputs, setValidInputs] = useState(false)
  const emailInputRef = useRef()
  const courseInputRef = useRef()
  const courseInputRef2 = useRef()
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const {data, error, loading} = useFirebase("/courses")
  const [courses, setCourses] = useState([])
  const [firstChoice, setFirst] = useState([])
  const [secondChoice, setSecond] = useState([])
 

console.log("id:", studentid, "kurser:", coursesInDB, "allt", item)

const onSubmit = (e) => {
 const studentEmail = emailInputRef.current.value
 const courseInputObligatory = courseInputRef.current.value
 const courseInput2nd = courseInputRef2.current.value
}

const checkInputs = (e) => {
  e.preventDefault()
  if(e.target.value !== "Välj:"){
    setValidInputs(true)
  }else{
    setValidInputs(false)
  }
}

useEffect(() => {
  if(item){
    setStudentPassword(item.map(i=> i.studentPassword))
    setStudentEmail(item.map(i => i.studentEmail ))
  }
  if(coursesInDB){
    setCourses(coursesInDB)
    setFirst(courses.map(item => item.firstChoice)[0])
    setSecond(courses.map(item => item.secondChoice)[0])
  }
}, [item, coursesInDB, courses])


  return ( 
  <StudentContainer>
    
    <FormInstructions
    onSubmit={onSubmit}>
   
    <h1>Hej igen {context.studentName}</h1>
    {loading ? <h2> Laddar... </h2> : <>
    {error && <h2> Något är fel på databasen</h2>}
    {firstChoice && <> 
    <IfAlreadyExists>
    <h2>Du är anmäld till :</h2>
    <TwoColumns
    largergap>
    <div>
    <h3>#1: {firstChoice}</h3>
    {data && data.filter(function (i){
            return i.courseName !== "DELETED"}).filter(function (course){return course.courseName === firstChoice}).map((item, indx) => (
              <div key={`${indx}-${item}-${firstChoice}`}>
                <p>Start: {item.startDate}</p>
                <p>Längd i veckor: {item.lengthWeeks} </p>
                <p>Lärare: {item.teacherAssigned}</p>
                </div>))}
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
      onChange={(e) => checkInputs(e)}
      >
        <option 
        value={"Välj:"} 
        data-testid="optionDefault"
        label={"Välj:"}/>

        {data && data.filter(function (course){
          return course.courseName !== firstChoice}).filter(function (i){
            return i.courseName !== "DELETED"
          }).map(item => ( 
        <option 
        value={item.courseName}
        key={item.courseID}>
          {item.courseName}
        </option>)
        )}
      </select>
      </div>
      <div className="Row">
      <label htmlFor="secondChoice">
        **Kursval 2:</label>
      <select id="secondChoice" 
      ref={courseInputRef2}
      data-testid="studentcourse2"
      >
      <option 
      value="Välj:" 
      name="Välj:"
      label="Välj:"/>
        {data && data.filter(function (course){return course.courseName !== coursesInDB.firstChoice}).filter(function (i){
            return i.courseName !== "DELETED"}).map(item => ( <option key={item.courseID} value={item.courseName}>{item.courseName}</option>)
        )}
        <option 
        value="Ingen"
        data-testid="IngetVal"
        name="Ingen"
        label="Ingen"/>
      </select>
      </div>
      </TwoColumns>
      <p className="instructions">
        ** Detta är inte obligatoriskt för att du ska kunna anmäla dig, men det kan vara bra att ha en back-up.</p>
        
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