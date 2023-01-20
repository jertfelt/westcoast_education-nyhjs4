import { FormInstructions } from "../../StylingElements/Form/Form";
import ValidationModal from "../../ui/Modal/ValidationModal";
import Modal from "../../ui/Modal/Modal";
import { useFirebase } from "../../utils/useFirebase";
import { useNavigate } from "react-router-dom";
import {useRef,useEffect,useState} from "react"
import { getDatabase, ref, set, remove } from "firebase/database";
import { ButtonContainerOutsideForm } from "../../StylingElements/Form/Form";
import { useDates } from "../../utils/useDates";
import { ButtonContainer } from "../../StylingElements/SectionsAdmin/AdminComponents";

const KursAddOrChange = ({typeOfForm, students, teachers, courses, title, ID, onChangeForm, courseExists}) => {
  const navigate = useNavigate()
  const {year, nextYear} = useDates()
  const [courseID, setCourseID] = useState(ID)
  const [allCourses, setAllCourses] = useState(courses)
  const [thisCourse, setThisCourse] = useState(courseExists || [])
  const [publishedStatus, setPublishedStatus] = useState(courseExists.published || false)
  const [assignedStudents1, setAssignedStudents1] = useState(Number(courseExists.studentsAssigned) || 0)

  useEffect(() => {
    if(typeOfForm === "registerNew"){
      setCourseID(allCourses.length) 
    }
  },[])

  const courseNameRef = useRef()
  const courseDescriptionRef = useRef()
  const startDateref = useRef()
  const lengthWeeksRef =  useRef()
  const studentsAssignedRef = useRef()

  const [instructions, setInstructions] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  
  const sendEditToFirebase = (coursename, 
      description, 
      startdate, 
      weeks, 
      students, 
      published, 
      ID) => {
      const db = getDatabase()
      set(ref(db, "courses/" + ID ),{
        courseName: coursename,
        courseDescription : description,
        startDate : startdate,
        lengthWeeks : weeks,
        studentsAssigned: students,
        published: published,
        courseID: ID,
      }).then(
        navigate("/admin")
      )
    }

    const confirmSave = (e) => {
      e.preventDefault()
        const coursename = courseNameRef.current.value;
        const description = courseDescriptionRef.current.value
        const startdate = startDateref.current.value
        const weeks = lengthWeeksRef.current.value
        const students = studentsAssignedRef.current.value
        const published = publishedStatus
        const ID = courseID
        if(
          coursename === "" || description === "" || startdate === "" || weeks === "" || students === "" || published === "" || ID === ""
        ){
          setShowModal2(true)
          setTitle("Något är fel")
          setMsg("Något saknas, du måste fylla i alla fälten")
        }
        else{
        sendEditToFirebase(
          coursename, 
          description, 
          startdate, 
          weeks, 
          students, 
          ID,
          published,  )
        }
    }

    const checkDate= (e) => {
      if (e.target.value <= year){
        instructionsUnclear(e)
      }
    }

    const deleteCourse=() => {
      const db = getDatabase()
      remove(ref(db, "/courses/" + courseID))
      setShowModal(false)
    }

    const publishCourse = () => {
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

  const [modalTitle, setTitle] = useState("")
  const [modalMsg, setMsg] = useState("")

  return (
    <>
  <FormInstructions 
    onSubmit={confirmSave}>
  
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
    <h1>{title}</h1>
    <div className="Row">
    <label 
          htmlFor="courseNameInput">
          Kursnamn:
    </label>
    <input 
          id="courseNameInput"
          type="text"
          ref={courseNameRef}
          defaultValue={courseExists.courseName || "Kursnamn"}
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
          defaultValue={courseExists.courseDescription || "Beskrivning"}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
    />
    </div>
    {instructions && 
    <p className="instructions">
      {infoMessage}</p>
    }
    {courseExists.startDate < year && 
    <p>Startdatum har redan passerat!</p>
    }

    {typeOfForm === "changeCourse" &&
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
          defaultValue={courseExists.startDate || year}
          ref={startDateref}
          onChange={checkDate}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
    /> 
    </div>}
    <div className="Row">
    <label 
    htmlFor="lengthWeeksInput">
      Antal veckor:
    </label>
    <input 
          id="lengthWeeksInput"
          type="number"
          defaultValue={courseExists.lengthWeeks || 2}
          min={2}
          max={15}
          ref={lengthWeeksRef}
    />
    </div>
    <div className="Row">
    <label 
    htmlFor="studentsAssignedChangeInput">
      Antal studenter:
    </label>
    <input 
        id="studentsAssignedChangeInput"
        defaultValue={assignedStudents1 || 0}
        type="number"
        onChange= {(e) => setAssignedStudents1(Number(e.target.value))}
        ref={studentsAssignedRef}
    />
    </div>
   

    <ButtonContainer>
    {typeOfForm==="changeCourse" && 
    <button className="smallBtn"
    onClick={()=>setShowModal(true)}
      disabled = {publishedStatus ? true : false}>
      Radera kurs
    </button>}
    
    <input 
      type="submit"
      value="Spara"/>
    <button className="smallBtn"
      onClick={typeOfForm === "changeCourse" ? onChangeForm : () => navigate(-1)}>
        Stäng 
    </button>
    </ButtonContainer>
  </FormInstructions>
  <ButtonContainerOutsideForm>
   <button 
    disabled ={assignedStudents1 >= 5 ? false : true }
    onClick = {publishCourse}
    >
      {assignedStudents1 >= 5 ? (<>{publishedStatus ? (<p>Avpublicera</p>):(<p>Publicera</p>)}</>):(<p>För att publicera kursen på hemsidan ska alla fält vara fyllda, och det måste vara fler än fem studenter</p>)}
    </button>
    </ButtonContainerOutsideForm></>
   );
}
 
export default KursAddOrChange;