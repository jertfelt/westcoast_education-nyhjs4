import { useState, useRef, useContext, useEffect} from "react";
import StudentContext from "../../Context/StudentContext";
import { FormInstructions } from "../../Components/StylingElements/Form/Form";
import {IfAlreadyExists, StudentContainer, TwoColumns} from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";
import { useNavigate } from "react-router-dom";
import ValidationModal from "../../Components/ui/Modal/ValidationModal";
import sendStudentEditToFb, { sendCourseToStudentAndUpdate, updateCourses } from "../../firebase/useSendToFb";
import ShowInfo from "./ShowInfo";



const RegisterCourseForm = ({ ifDirected, studentid, item, course1}) => {
  const navigate = useNavigate()
  const context = useContext(StudentContext);
  const [validInputs, setValidInputs] = useState(false)
  const courseInputRef = useRef()
  
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const {data, error, loading} = useFirebase("/courses")
  const [firstChoice, setFirst] = useState("")
  const [warning, setWarning] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [courseID1, setCourseID1] = useState("")
  const [titleModal, setTitle] = useState("")
  const [messageModal, setMessage] = useState("")
  const [showCourseInfo, setShowCourseInfo ]= useState(false)
  const [noFirst, setNoFirst] = useState(false)

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


const confirmingChange = (e) => {
  e.preventDefault()
  setShowModal(false)
  prepareData()
}

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
   
    console.log("null")
    let firstChoiceNew = courseInputRef.current.value
    let chosen1 = data.filter(function (i){
      return i.courseName !== "DELETED"}).filter(function (course){
        return course.courseName === firstChoiceNew
    }).map(item => item)

    let newID= Number(chosen1.map(item => item.courseID))

    let courseID = newID
    let published = (chosen1.map(item => item.published))[0]
    let courseName = (chosen1.map(item => item.courseName))[0]
    let lengthWeeks = (Number(chosen1.map(item => item.lengthWeeks)))
    let courseDescription = (chosen1.map(item => item.courseDescription))[0]
    let startDate = (chosen1.map(item => item.startDate))[0]
    let teacherAssigned = (chosen1.map(item => item.teacherAssigned))[0]

    
    let referenceURLCourse = "/courses/" + newID
  
    sendCourseToStudentAndUpdate(
      courseID, 
      published,
      lengthWeeks,
      courseDescription,
      courseName,
      startDate,
      teacherAssigned,
      referenceURLCourse
    )
    
      // sendStudentEditToFb(
      //   courses,
      //   newEmail,
      //   studentID,
      //   newName,
      //   newPassword,
      //   referenceURL
      // )
      // let studentCourseFirstChoice = firstChoiceNew
      //   contextFunction(
      //     studentID, 
      //     studentName,
      //     studentLoggedIn,
      //     studentEmail,
      //     studentCourseFirstChoice
      //   )
  }
  else{
    
    console.log(firstChoice, "chosen:", courseInputRef.current.value)
    let chosen1 = filterNames(firstChoice)
    let oldID = Number(chosen1.map(item => item.courseID))
    
    let published1 = (chosen1.map(item => item.published))[0]
    let lengthWeeks1 = (Number(chosen1.map(item => item.lengthWeeks)))
    let courseDescription1 = (chosen1.map(item => item.courseDescription))[0]
    let startDate1 = (chosen1.map(item => item.startDate))[0]
    let courseName1 = (chosen1.map(item => item.courseName))[0]
    let teacherAssigned1 = (chosen1.map(item => item.teacherAssigned))[0]
    let courseID1 = oldID

    let chosenNew = filterNames(courseInputRef.current.value)
    let newID = Number(chosenNew.map(item => item.courseID))
    let courseID2 = newID
    let published2 = (chosen1.map(item => item.published))[0]
    let lengthWeeks2 = (Number(chosen1.map(item => item.lengthWeeks)))
    let courseDescription2 = (chosen1.map(item => item.courseDescription))[0]
    let startDate2 = (chosen1.map(item => item.startDate))[0]
    let courseName2 = (chosen1.map(item => item.courseName))[0]
    let teacherAssigned2 = (chosen1.map(item => item.teacherAssigned))[0]
    
    let referenceURLCourseOLD = "/test/" + oldID
    let referenceURLCourseNEW = "/test/" + newID
  
  
  
    sendCourseToStudentAndUpdate(
      referenceURLCourseNEW,
      courseID2, 
      published2,
      lengthWeeks2,
      courseDescription2,
      courseName2,
      startDate2,
      teacherAssigned2,
    )

    updateCourses(
      courseID1, 
      published1,
      lengthWeeks1,
      courseDescription1,
      courseName1,
      startDate1,
      teacherAssigned1,
      referenceURLCourseOLD,
    )

    
      // sendStudentEditToFb(
      //   courses,
      //   newEmail,
      //   studentID,
      //   newName,
      //   newPassword,
      //   referenceURL
      // )
      // let studentCourseFirstChoice = courseInputRef.current.value
      //   contextFunction(
      //     studentID, 
      //     studentName,
      //     studentLoggedIn,
      //     studentEmail,
      //     studentCourseFirstChoice
      //   )
  
  
  
  
  }
  
  //  navigate("/student")
}
 
const onSubmit = (e) => {
  e.preventDefault()
  const newName = context.studentName
  let studentName = newName
    let newEmail = studentEmail
    let newPassword = studentPassword
    let courses = {courseName : courseInputRef.current.value, courseName2nd:  ""}
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
 
  if(e.target.value !== "Välj:"){
    setValidInputs(true)
    setShowCourseInfo(true)
    
}}

// 



  return ( 
  <StudentContainer>
    {showModal && <ValidationModal
    title={titleModal}
    message={messageModal}
    onClickYes = {(e) => confirming(e)}
    onClick = {(e) => notConfirming(e)}
    />}
     {showModal2 && <ValidationModal
    title={titleModal}
    message={messageModal}
    onClickYes = {(e) => confirmingChange(e)}
    onClick = {() => setShowModal2(false)}
    />}

    <FormInstructions
    onSubmit={onSubmit}>
    <h1 data-testid ="welcome">{context.studentName}</h1>
    {noFirst && <h2>Du är inte anmäld till någon kurs!</h2>}
    {loading && <h2> Laddar... </h2>}
    {!data && <h2>Laddar...</h2>}
    {error && <h2> Något är fel på databasen</h2>}
     
    <TwoColumns
    largergap>
    {data && <div>
      
      {!noFirst && 
      <IfAlreadyExists>
        <h3>Du är anmäld till:</h3>
        {data && data.filter(function (i){
            return i.courseName !== "DELETED"}).filter(function (course){return course.courseName === firstChoice}).map((item, indx) => (
        <ShowInfo 
        key={`${indx}-${item.courseID}-${indx}${indx}-${indx}`}
        courses = {item}
        />))}
      </IfAlreadyExists>
    }
        </div>} 
        <div>
      {showCourseInfo && <div>
      <h3>Nytt val:</h3>
      {data && data.filter(function (i){
        return i.courseName !== "DELETED"}).filter(function (course){return course.courseName === courseInputRef.current.value}).map((item, indx) => (
        <ShowInfo 
        key={`${indx}-3333-${indx}${indx}-${indx}`}
        courses = {item}
        />))}
    </div>}
    
      </div>
        
        </TwoColumns>
        <div className="Row">
      
      <label htmlFor="firstChoice">
        Välj ny kurs här:</label>
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
        {warning && !item.published && <div><h3>OBS! </h3>
        <p className="instructions">
        Kursen du valt är inte publicerad ännu, det behövs vara minst fem studenter anmälda. <br/>
        Vi hör av oss i god tid till din mail innan om ditt val inte startar.</p>
        </div>
        }

        <input
      className={validInputs ? "enabled" :"disabled"}
      type="submit"
      value="Skicka"
      />
      
      
    </FormInstructions>
  </StudentContainer> );
}
 
export default RegisterCourseForm ;