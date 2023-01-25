import { useState, useRef, useContext, useEffect} from "react";
import StudentContext from "../../Context/StudentContext";
import { FormInstructions } from "../../Components/StylingElements/Form/Form";
import {IfAlreadyExists, StudentContainer, TwoColumns} from "../../Components/StylingElements/StudentSections/StudentSections";
import { useFirebase } from "../../Components/utils/useFirebase";
import { useNavigate } from "react-router-dom";
import ValidationModal from "../../Components/ui/Modal/ValidationModal";
import sendStudentEditToFb, { sendCourseToStudentAndUpdate } from "../../firebase/useSendToFb";
import ShowInfo from "./ShowInfo";



const RegisterCourseForm = ({ ifDirected, studentid, item, course1, course2}) => {
  const navigate = useNavigate()
  const context = useContext(StudentContext);
  const [validInputs, setValidInputs] = useState(false)
  const courseInputRef = useRef()
  
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const {data, error, loading} = useFirebase("/courses")
  const [firstChoice, setFirst] = useState("")
  const [warning, setWarning] = useState(false)
  const [idToDB, setIDToDB] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [courseID1, setCourseID1] = useState("")
  const [titleModal, setTitle] = useState("")
  const [messageModal, setMessage] = useState("")
  const [showCourseInfo, setShowCourseInfo ]= useState(false)
  const [option, setOption] = useState("")
  
useEffect(() =>{
  if(ifDirected){
    setOption(ifDirected)
    setShowCourseInfo(true)
  }
})


useEffect(() => {
  if(data){
    if(item){
      const courses = item.map(i => i.courses)
      setFirst(courses.map(item => item.courseName)[0])
      
      if(!studentid){
        setIDToDB(item.map(i => i.studentID)[0])
      }
      else{
        setIDToDB(studentid)
      }
    }
    else{
      if(context.studentCourseFirstChoice !== "")
      setFirst(context.studentCourseFirstChoice)
    }
  }
},[data, item, context.studentCourseFirstChoice, studentid])




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

const prepareData = () => {

  let firstChoiceNew = courseInputRef.current.value
    let chosen1 = data.filter(function (i){
      return i.courseName !== "DELETED"}).filter(function (course){
        return course.courseName === firstChoiceNew
      }).map(item => item)
    setCourseID1(Number(chosen1.map(item => item.courseID)))
    let published = (chosen1.map(item => item.published))[0]
    let lengthWeeks = (Number(chosen1.map(item => item.lengthWeeks)))
    let courseDescription = (chosen1.map(item => item.courseDescription))[0]
    let courseName = (chosen1.map(item => item.courseName))[0]
    let startDate = (chosen1.map(item => item.startDate))[0]
    let teacherAssigned = (chosen1.map(item => item.teacherAssigned))[0]
    

    const studentName = context.studentName
    let newName = studentName
    let newEmail = studentEmail
    let newPassword = studentPassword
    let courseID = courseID1
    const studentID = idToDB;
    let studentLoggedIn = true
    let studentCourseFirstChoice = firstChoiceNew
    let referenceURL = "/students/" + idToDB
    let referenceURLCourse = "/courses/" + courseID 
    let courses = {courseName : firstChoiceNew,
      courseName2nd:  ""}
    
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
      sendStudentEditToFb(
        courses,
        newEmail,
        studentID,
        newName,
        newPassword,
        referenceURL
      ).then(
        contextFunction(
          studentID, 
          studentName,
          studentLoggedIn,
          studentEmail,
          studentCourseFirstChoice
        )
      )
    
      navigate("/student")
}
 
const onSubmit = (e) => {
  e.preventDefault()


    prepareData()

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
    setOption(e.target.value)
}}

// 
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
}, [item,context, course1])


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
    <h2>Du är anmäld till :</h2>
    {loading && <h2> Laddar... </h2>}
    {!data && <h2>Laddar...</h2>}
    {error && <h2> Något är fel på databasen</h2>}
    
    <TwoColumns
    largergap>
    {data && <div>
      {!item && <p>Laddar profil...</p>}
      {firstChoice && 
      <IfAlreadyExists>
        <h3>Tidigare:</h3>
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