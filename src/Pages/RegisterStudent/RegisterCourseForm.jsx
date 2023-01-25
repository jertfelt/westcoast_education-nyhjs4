import { useState, useRef, useContext, useEffect} from "react";
import StudentContext from "../../Context/StudentContext";
import { FormInstructions } from "../../Components/StylingElements/Form/Form";
import {IfAlreadyExists, StudentContainer, TwoColumns} from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";
import { getDatabase,  increment,  ref, set, } from "firebase/database";
import { useNavigate } from "react-router-dom";
import ValidationModal from "../../Components/ui/Modal/ValidationModal";


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
  const [idToDB, setIDToDB] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [courseID1, setCourseID1] = useState("")
  const [courseID2, setCourseID2] = useState("")
 
// console.log(studentid, "original", "idToDB:", idToDB, item.map(i => i.studentID)[0])
useEffect(() => {
  if(data){
    if(!studentid){
      setIDToDB(item.map(i => i.studentID)[0])
    }
    else{
      setIDToDB(studentid)
    }
  }
},[data, item, studentid])

const sendEditToFb = (
    firstChoiceNew,
    secondChoiceNew,
    studentEmail,
    idToDB,
    studentName,
    studentPassword,
   
  ) => {
  const db = getDatabase()
  const studentRef = ref(db, "/students/" + idToDB );

  set(studentRef,{
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



const sendEditToCourse = (
  courseID1,
  courseID2
  ) => {
    console.log("courseID:", courseID1, courseID2)
    const db = getDatabase()
    const course1 = ref(db, "/test/" + courseID1)
    set(course1, {
      courseID: courseID1,
      studentsAssigned: increment(1)
    })
    // if(courseID2){
    //   const course2 = ref(db, "/courses/" + courseID2)
      
    // }
  }

const confirmingChange = (e) => {
  e.preventDefault()
  prepareData()
  setShowModal2(false)
}

const prepareData = () => {
  
  const studentName = context.studentName
  let firstChoiceNew = courseInputRef.current.value
  let secondChoiceNew = ""

  if(data){
   console.log("all seconds:", secondChoice, newSecondChoice, secondChoiceNew)
    if(!secondChoice){
     
      if(newSecondChoice === "Ingen"){
        secondChoiceNew = ""
      }
      else if (newSecondChoice === "Välj"){
        secondChoiceNew = ""
      }
      else{
        secondChoiceNew = newSecondChoice
      }
    }
    
    const setChosenCourse = (nameOfSet, newChoiceName) => {
      let chosen = data.filter(function (i){
        return i.courseName !== "DELETED"}).filter(function (course){
          return course.courseName === newChoiceName
        }).map(item => item)
        console.log("chosen id 2: ", chosen)
    }


    if(secondChoice){
      if(secondChoice === "Välj" || secondChoice === "Ingen")
      { 
        if(newSecondChoice === "Ingen"){
          secondChoiceNew = ""
        }
        else if (newSecondChoice === "Välj"){
          secondChoiceNew = ""
        }
        else{
          secondChoiceNew = newSecondChoice
          setChosenCourse("setCourseID2", secondChoiceNew)
        }
      }
      else{
        if (newSecondChoice !== secondChoice){
          if(newSecondChoice !== firstChoiceNew){
            secondChoiceNew = newSecondChoice
            setChosenCourse("setCourseID2", secondChoiceNew)
          }
        }
        else{
          secondChoiceNew = secondChoice  
          setChosenCourse("setCourseID2", secondChoiceNew)
        }
     
          // setCourseID2(Number(chosen2.map(item => item.courseID)))
      }
    }
   
   

    let chosen1 = data.filter(function (i){
      return i.courseName !== "DELETED"}).filter(function (course){
        return course.courseName === firstChoiceNew
      }).map(item => item)
    setCourseID1(Number(chosen1.map(item => item.courseID)))

    console.log("courseID1:", courseID1, "kurs: ", firstChoiceNew)
    console.log("courseID2:", courseID2, "kurs: ", secondChoiceNew)

// sendEditToFb(
//     firstChoiceNew,
//     secondChoiceNew,
//     studentEmail,
//     idToDB,
//     studentName,
//     studentPassword, 
//   )
  sendEditToCourse(
    courseID1,
    courseID2
  )
  
}}
 
const onSubmit = (e) => {
  e.preventDefault()

  if(courseInputRef.current.value !== firstChoice && courseInputRef.current.value === ifDirected){
    setShowModal2(true)
  }
  else{
    prepareData()
  }
 
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
    console.log("not published")
    setWarning(true)
    console.log(array.courseName, value)
  }
}
)
}

const confirming = (e) => {
  e.preventDefault()
  setValidInputs(true)
  setShowModal(false)
}

const notConfirming = (e) => {
  e.preventDefault()
  setValidInputs(false)
  setShowModal(false)
}


const checkInputsFirstChoice = (e) => {
  e.preventDefault()
  checkIfNotPublished(e.target.value)
  
  if(e.target.value === ifDirected){
    setShowModal(true)
  }
  if(e.target.value !== "Välj:"){
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
  checkIfNotPublished(e.target.value)
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
    {showModal && <ValidationModal
    title={`Du har valt: ${ifDirected}`}
    message="Stämmer det?"
    onClickYes = {(e) => confirming(e)}
    onClick = {(e) => notConfirming(e)}
    />}
     {showModal2 && <ValidationModal
    title={`Du har ändrat kurs`}
    message={`Från ${firstChoice} till ${courseInputRef.current.value}. Stämmer detta?`}
    onClickYes = {(e) => confirmingChange(e)}
    onClick = {() => setShowModal2(false)}
    />}

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
                {item.published && 
                <p>Start: {item.startDate}</p>}
                {!item.published && item.studentsAssigned <5 && <>
                <p>Kursen är ännu inte helt bokad! Det måste vara minst fem studenter anmälda. Vi hör av oss via mail.</p>
                <p>Just nu: {item.studentsAssigned}/5 studenter</p>
                </>}
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
                {item.published && 
                <p>Start: {item.startDate}</p>}
                {!item.published && item.studentsAssigned <5 && <>
                <p>Kursen är ännu inte helt bokad! Det måste vara minst fem studenter anmälda. Vi hör av oss via mail.</p>
                <p>Just nu: {item.studentsAssigned}/5 studenter</p>
                </>}
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
        {ifDirected && <><option 
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
        {warning && !item.published && <div><h3>OBS! </h3>
        <p className="warning">
        Kursen du valt är inte publicerad ännu, det behövs vara minst fem studenter anmälda. <br/>
        Vi hör av oss i god tid till din mail innan om ditt val inte startar.</p>
        </div>
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