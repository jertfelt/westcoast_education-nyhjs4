import { FormInstructions} from "../../StylingElements/Form/Form";
import ValidationModal from "../../ui/Modal/ValidationModal";
import Modal from "../../ui/Modal/Modal";

import { useNavigate } from "react-router-dom";
import { useDates } from "../../utils/useDates";
import { useRef, useEffect, useState } from "react";
import { getDatabase, ref, set} from "firebase/database"


const KursChangeForm = ({course}) => {
  const navigate = useNavigate()
  const {year, nextYear} = useDates()
  const courseNameRef = useRef()
  const courseDescriptionRef = useRef()
  const startDateref = useRef()
  const lengthWeeksRef =  useRef()
  const studentsAssignedRef = useRef()
  const [instructions, setInstructions] = useState(false)
  const [courseID, setCourseID] = useState(course.courseID)
  const [publishedStatus, setPublishedStatus] = useState(course.published)
  const [isLoading, setLoading] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
 
  const handleDiscard = (e) => {
    clearForm()
  }

  const clearForm = () =>{
    courseNameRef.current.value = ""
    courseDescriptionRef.current.value = ""
    startDateref.current.value = ""
    lengthWeeksRef.current.value = ""
    studentsAssignedRef.current.value = ""
    }

    const sendEditToFirebase = (coursename, description, startdate, weeks, students, published, ID) => {
      const db = getDatabase()
      set(ref(db, "courses/" + ID ),{
        courseName: coursename,
        courseDescription : description,
        startDate : startdate,
        lengthWeeks : weeks,
        studentsAssigned: students,
        courseID: ID,
        published: published,
      })
      
    }


  useEffect(() => {
    if(isLoading){
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }}, [isLoading])
    

    
  const deleteCourse=(courseID) => {
    ref.doc(courseID).delete()
    setShowModal(false)
  }

  const publishCourse = (e) => {
    e.preventDefault()
    if(course.published){
      setPublishedStatus(false)
      setShowModal2(true)
    }
    else{
      setPublishedStatus(true)
      setShowModal2(true)
    }
  }

  const confirmSave = (e) => {
    e.preventDefault()
    setLoading(true)
      const coursename = courseNameRef.current.value;
      const description = courseDescriptionRef.current.value
      const startdate = startDateref.current.value
      const weeks = lengthWeeksRef.current.value
      const students = studentsAssignedRef.current.value
      const published = publishedStatus
      const ID = courseID
      sendEditToFirebase(coursename, 
        description, 
        startdate, 
        weeks, 
        students, 
        published, 
        ID )
      navigate("/kurser/" + ID)
   
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
  <FormInstructions
  onSubmit={confirmSave}
  >
    {showModal && <ValidationModal
    title="Är du säker?"
    message="Om du raderar det här så försvinner kursen"
    onClickYes={() => deleteCourse}
    onClick={() => setShowModal(false)}
    />}
    {showModal2 && <Modal
    title="Nästan färdig!"
    message="Efter att du trycker på SPARA i formuläret så är sidan publicerad!"
    onClick={() => setShowModal2(false)}
    />}
   
    <h2>Ändra kursens detaljer här:</h2>

    <button onClick={publishCourse}>{course.published ? <p>Avpublicera</p> : <p>Publicera</p>}</button>
    
    <label 
          htmlFor="courseNameChangeInput">
          Kursnamn:
    </label>
    <input 
          id="courseNameChangeInput"
          type="text"
          ref={courseNameRef}
          defaultValue={course.courseName}
    />
    <label 
          htmlFor="courseDescriptionChangeInput">
            Kursbeskrivning:
    </label>
    
    <textarea 
          id="courseDescriptionChangeInput"
          type="text"
          maxLength="50"
          ref={courseDescriptionRef}
          defaultValue={course.courseDescription}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
    />
    {instructions && 
    <p className="instructions">{infoMessage}</p>
    }
    {course.startDate < year && 
    <p>Startdatum har redan passerat!</p>
    }
    {course.startDate >= year && <>
    <label 
    htmlFor="startDateChangeInput">
      Startdatum:
    </label>
    <input 
          id="startDateChangeInput"
          type="date"
          min={year}
          required
          max={nextYear}
          defaultValue={course.startDate}
          ref={startDateref}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
    /> 
    </>}
    <label 
    htmlFor="lengthWeeksChangeInput">
      Antal veckor:
    </label>
    <input 
          id="lengthWeeksChangeInput"
          type="number"
          defaultValue={course.lengthWeeks}
          min={2}
          max={15}
          ref={lengthWeeksRef}
    />
    <label 
    htmlFor="studentsAssignedChangeInput">
      Antal studenter:
    </label>
    <input 
        id="studentsAssignedChangeInput"
        defaultValue={course.studentsAssigned}
        type="number"
        ref={studentsAssignedRef}
    />
    {!isLoading && <>
      <input 
      type="submit"
      value="Spara"/>
      <button onClick={()=>setShowModal(true)}
      disabled = {course.published ? true : false}>
        Radera kurs
      </button>
       <button 
      onClick={handleDiscard}>
        Stäng 
        </button>
    </>}
  </FormInstructions>  );
}
 
export default KursChangeForm;