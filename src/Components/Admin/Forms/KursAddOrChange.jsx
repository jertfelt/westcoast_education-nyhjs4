import { FormInstructions } from "../../StylingElements/Form/Form";
import ValidationModal from "../../ui/Modal/ValidationModal";
import Modal from "../../ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import {useRef,useEffect,useState} from "react"
import { getDatabase, ref, set} from "firebase/database";
import { ButtonContainerOutsideForm } from "../../StylingElements/Form/Form";
import { useDates } from "../../utils/useDates";
import { ButtonContainer, PublishBtn } from "../../StylingElements/SectionsAdmin/AdminComponents";
import { TwoColumns } from "../../StylingElements/SectionsAdmin/AdminSite";

const KursAddOrChange = ({typeOfForm, teachers, courses, title, ID, onChangeForm, courseExists}) => {
  const navigate = useNavigate()
  const {year, nextYear} = useDates()
  const [courseID, setCourseID] = useState(ID)
  const [publishedStatus, setPublishedStatus] = useState(false)
  const [competencesTeachers, setCompetences] = useState([])
  const [assignedStudents1, setAssignedStudents1] = useState(0)
  const [loading, setLoading] = useState(false)
  const [modalTitle, setTitle] = useState("")
  const [modalMsg, setMsg] = useState("")
  const courseNameRef = useRef()
  const courseDescriptionRef = useRef()
  const startDateref = useRef()
  const lengthWeeksRef =  useRef()
  const studentsAssignedRef = useRef()
  const [instructions, setInstructions] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [showTeacherOnlyOneChoice, setTeacherOnlyOneChoice] = useState(false)
  const [showTeacherMultiple, setTeacherMultiple] = useState(false)
  const [teacherItem, setTeacherItem] = useState("")
  const [multipleTeachersItem, setMultipleTeachersItem] = useState("")
  const [chosenTeacher, setChosenTeacher] = useState("")
  const [validation, setValidation] = useState(false)

  useEffect(() => {
    if(typeOfForm === "registerNew"){
      setLoading(true)
      if(courses){
        setCourseID(courses.length)
        setLoading(false)
      }
    }
    else{
      if(courseExists && courses){
        setPublishedStatus(courseExists.published)
        setAssignedStudents1(Number(courseExists.studentsAssigned))
      }
    }
  },[courseExists, courses, typeOfForm])

  useEffect(() => {
    if(teachers){
      let comp = teachers.filter(function (teacher){
        return teacher.status !== "DELETED"}).map(item => item.competences)
        let flattened = comp.flat(1)
        const noDuplicates = [...new Set(flattened)]
        const sortedAz = noDuplicates.sort()
      setCompetences(sortedAz)
    }
  },[teachers])

  const chooseCompetence =(e) => {
 
    let filtered = teachers.filter(function (teacher){
      return teacher.status !== "DELETED"}).map(item => item)
   
    let compCount = filtered.filter(function (t){ return t.competences}).map(item => item.competences).flat(1).filter((v) => (v === e.target.value)).length; 

    let filteredByCourseValue = []
    filtered.forEach(teacher => {
      if(teacher.competences.includes(e.target.value)){
        filteredByCourseValue.push(teacher)
      }
    })

      if(compCount> 1){
        showTeacherSelect(filteredByCourseValue)
      }
      else{
        showTeacherOne( filteredByCourseValue, e.target.value)
      }
  }
  const showTeacherOne = (filteredByCourseValue, value) => {
      setTeacherOnlyOneChoice(true)
      setTeacherMultiple(false)
      setTeacherItem(filteredByCourseValue)
      setValidation(true)
      setChosenTeacher(teacherItem)
  }

  const showTeacherSelect = ( filteredByCourseValue) => {
    setTeacherOnlyOneChoice(false)
    setTeacherMultiple(true)
    setMultipleTeachersItem(filteredByCourseValue)
  }

  const chooseTeacher = (e) => {
    setValidation(true)
    let filtered = teachers.filter(function (teacher){
      return teacher.status !== "DELETED"}).map(item => item)
    console.log(e.target.value, teachers, filtered)
    let id = Number(e.target.value)
    
    let chosen = filtered.filter(function (teacher){
      return teacher.id === id
    }).map(item => item)
    console.log(chosen)
    setChosenTeacher(chosen)
    
  }

  const sendEditToFirebase = (
      coursename,
      description,
      startdate,
      weeks,
      students,
      published,
      ID,
      teacherAssigned,
      ) => {
      const db = getDatabase()
      set(ref(db, "/courses/" + ID ),{
        courseDescription : description,
        courseID: courseID,
        courseName: coursename,
        lengthWeeks : weeks,
        published: published,
        startDate : startdate,
        studentsAssigned: students,
        teacherAssigned: teacherAssigned,
      }).then(
        navigate("/admin")
      )
    }

    const confirmSave = (e) => {
      e.preventDefault()
        const coursename = courseNameRef.current.value;
        const description = courseDescriptionRef.current.value
        const startdate = startDateref.current.value
        const weeks = Number(lengthWeeksRef.current.value)
        const students = Number(studentsAssignedRef.current.value)
        const published = publishedStatus
        const ID = courseID
        let teacherAssigned = chosenTeacher
        if(!chosenTeacher){
          teacherAssigned= "Default"
        }
      
        sendEditToFirebase(
          coursename,   
          description,
          startdate,
          weeks,
          students,
          published,
          ID,
          teacherAssigned,
          )
    }

    const checkDate= (e) => {
      if (e.target.value <= year){
        instructionsUnclear(e)
      }
    }

    const deleteCourse=(e) => {
      e.preventDefault()
      const db = getDatabase()
      set(ref(db, "/courses/" + courseID ),{
        courseName: "DELETED",
        courseID: courseID,})
        setShowModal(false)
    }

    const publishCourse = (e) => {
      e.preventDefault()
      if(publishedStatus){
        setPublishedStatus(false)
        setShowModal2(true)
          setTitle("Nästan färdig")
          setMsg("Tryck på SPARA så är sidan avpublicerad")
      }
      else{
          setPublishedStatus(true)
          setShowModal2(true)
          setTitle("Nästan färdig")
          setMsg("Tryck på SPARA så är sidan publicerad")
        }
    }
  const instructionsUnclear=(e) => {
    if(e.target.id === "courseDescriptionChangeInput"){
      setInfoMessage("Högst 50 tecken, inga länkar tillåtna.")
      setInstructions(true)
    }
    if(e.target.id ==="startDateChangeInput"){
      setInfoMessage("Du måste välja ett datum som är senare än idag")
      setInstructions(true)
    }
  }

  return (
    <> 
    <h1>{title}</h1>
      <PublishBtn
        data-testid="testingPublishBtn"
        className={assignedStudents1 >= 5 ? "ordinary" : "text"}
        disabled ={assignedStudents1 >= 5 ? false : true }
        onClick = {(e) => publishCourse(e)}>
      {assignedStudents1 >= 5 ? (<>{publishedStatus ? (<p>Avpublicera</p>):(<p>Publicera</p>)}</>):(<p>För att publicera kursen på hemsidan ska alla fält vara fyllda, och det måste vara fler än fem studenter</p>)}
      </PublishBtn>
      <FormInstructions
      Kursform
      data-testid="formaddorchange"
      onSubmit={confirmSave}>
      {loading ? (<h1>Laddar</h1>) :(<>
    {typeOfForm === "changeCourse" && <>
      {showModal && <ValidationModal
      title="Är du säker?"
      message="Om du raderar det här så försvinner kursen"
      onClickYes={() => deleteCourse}
      onClick={() => setShowModal(false)}
      />}
    </>}
    {showModal2 && <Modal
      title={modalTitle}
      message={modalMsg}
      onClick={() => setShowModal2(false)}
      />}
    <div className="Row">
    <label
          htmlFor="courseNameInput">
          Kursnamn:
    </label>
    <input
          id="courseNameInput"
          type="text"
          ref={courseNameRef}
          defaultValue={courseExists ? courseExists.courseName : "Kursnamn"}
    />
    </div>
 
    <div className="Row">
      <label
          htmlFor="courseDescriptionInput">
            Kursbeskrivning:
    </label>
    <textarea
          id="courseDescriptionInput"
          type="text"
          maxLength="50"
          ref={courseDescriptionRef}
          defaultValue={courseExists ? courseExists.courseDescription : "Beskrivning"}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
    />
    </div>

    {instructions &&
    <p className="instructions">
      {infoMessage}</p>
    }

    {courseExists && courseExists.startDate < year &&
    <p>Startdatum har redan passerat!</p>
    }
    <div className="Row">
    <label
          htmlFor="startDateInput">
          Startdatum:
    </label>
    <input
          id="startDateInput"
          type="date"
          min={year}
          required
          max={nextYear}
          defaultValue={courseExists ? courseExists.startDate : year}
          ref={startDateref}
          onChange={checkDate}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
    />
    </div>
    <div className="Row">
    <label
    htmlFor="lengthWeeksInput">
      Veckor längd (i siffror):
    </label>
    <input  
          className="number"
          id="lengthWeeksInput"
          type="text"
          defaultValue={courseExists ? courseExists.lengthWeeks : "2"}
          pattern= "[0-9]+"
          minvalue="2"
          maxvalue="15"
          ref={lengthWeeksRef}
    />
    </div>
    <div className="Row">
    <label
    htmlFor="studentsAssignedChangeInput">
      Antal studenter: 
    </label>
    <input
        className="number"
        id="studentsAssignedChangeInput"
        defaultValue={courseExists ? assignedStudents1 : 0}
        type="text"
        pattern= "[0-9]+"
        onChange= {(e) => setAssignedStudents1(Number(e.target.value))}
        ref={studentsAssignedRef}
    />
    </div>
    <div >
      <div className="Row">
      <label htmlFor="chooseSubject">Välj ämne & lärare: </label>
      <select id="chooseSubject"
      required
      aria-labelledby ="Välj ämne:"
      onChange={(e) => chooseCompetence(e)}
      >
    {competencesTeachers && competencesTeachers.map((item, indx )=> (
        <option key={indx}
        value={item}>
          {item}
        </option>
        ))}
      </select>
      </div>
     
      {showTeacherMultiple && <div className="Row">
      <label htmlFor="chooseTeacher">Finns flera val! Välj lärare:</label>
      <select id="chooseTeacher"
      required
      aria-labelledby ="Välj lärare:"
      onChange={(e) => chooseTeacher(e)}> 
      {multipleTeachersItem.map(item => (
        <option 
        key={item.id}
        value={item.id}>
        {item.firstName} {item.lastName}
        </option>
      ))}
      </select>
      </div>}
      </div>
    <input
      className="centered"  
      type="submit"
      value="Spara"/>
    </>)}
  </FormInstructions>
  
  <ButtonContainerOutsideForm>
    <div>
      {validation && <div> 
        {chosenTeacher && chosenTeacher.map(item => (
        <div className="teacher"
        key={item.lastName}>
          <p>Lärare: {item.firstName} {item.lastName}<br/>Email: {item.email}</p>
        </div>
      ))}
      {}
      </div>}
        
      {!validation && <>  
      <h3>Tillgängliga kompetenser:</h3>
      <TwoColumns
      List>
      <ul>
      {competencesTeachers.map((item, indx) => {
      if(indx < competencesTeachers.length/2) return (
        <li key={`${item}-${indx}`}>
        {item}
        </li>
      )})}
      </ul>
      
      <ul>
      {competencesTeachers.map((item, indx) => {
      if(indx >= competencesTeachers.length/2) return (
        <li key={`${item}-${indx}`}>
        {item}
      </li>
      )})}
      </ul>
      </TwoColumns>
      </>} 
    </div>
    <ButtonContainer>
    {typeOfForm==="changeCourse" &&
    <button 
      onClick={(e)=>deleteCourse(e)}
      disabled = {courseExists && courseExists.published ? true : false}>
    Radera kurs
    </button>} 
    <button className="closingButt" 
      onClick={typeOfForm === "changeCourse" ? onChangeForm : () => navigate(-1)}>
        Stäng
    </button>
    </ButtonContainer>
  </ButtonContainerOutsideForm></>
   );
}

export default KursAddOrChange;