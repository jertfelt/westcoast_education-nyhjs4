import { FormInstructions} from "../../StylingElements/Form/Form";
import ValidationModal from "../../ui/Modal/ValidationModal";
import Modal from "../../ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useDates } from "../../utils/useDates";
import { useRef, useEffect, useState } from "react";
import { getDatabase, ref, set} from "firebase/database"
import CheckBoxComponent from "./CheckBoxComponent";
import styled from "styled-components";

const TwoColumns = styled.div`
display:flex;
gap:1rem;
`

const TeacherChangeForm = ({teacher, allaKompetenser}) => {
  const navigate = useNavigate()
  
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const personalIDRef = useRef()
  const emailRef =  useRef()
  const mobileNoRef = useRef()
  const [allCompetences, setCompetences] = useState([])
  const [teacherID, setTeacherID] = useState(teacher.id)

  //form behaviours
  const [instructions, setInstructions] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")
  const [youDisobeyedInstruction, setYouDisobeyedInstruction] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [disabledPid, setDisabledPid] = useState(false)
  console.log(allaKompetenser)
  

  useEffect(() => {
    if(isLoading){
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }}, [isLoading])

  const handleDiscard = (e) => {
    clearForm()
  }

  const clearForm = () =>{
    firstNameRef.current.value = ""
   lastNameRef.current.value = ""
    personalIDRef.current.value = ""
    emailRef.current.value = ""
   mobileNoRef.current.value = ""
    }

    const sendEditToFirebase = (ID, firstName, lastName, personalID, competences, mobileNo, email) => {
      const db = getDatabase()
      set(ref(db, "teachers/" + ID ),{
        competences: competences,
        id: ID,
        firstName : firstName,
        lastName: lastName,
        mobileNo: mobileNo,
        email: email,
        personalID: personalID,
      })
    }

    const deleteTeacher=(teacherID) => {
      ref.doc(teacherID).delete()
      setShowModal(false)
    }

  const confirmSave =(e) =>{
    e.preventDefault()
    setLoading(true)
      const firstName = firstNameRef.current.value 
      const lastName = lastNameRef.current.value
      const personalID = personalIDRef.current.value
      const email = emailRef.current.value
      const mobileNo = mobileNoRef.current.value
      const competences = allCompetences
      const ID = teacherID
      sendEditToFirebase(
        firstName,
        lastName, 
        personalID,
        email,
        mobileNo,
        competences,
        ID )
      navigate("/larare/" + ID)
  }

  const instructionsUnclear=(e) => {
    if(e.target.id === "pIDChangeInput"){
     setInfoMessage("Du får bara mata in siffror! 10- 12 stycken.")
     setInstructions(true)
    }
    if(e.target.id ==="mobileNoChangeInput"){
     setInfoMessage("Du behöver inte skriva landsnummer")
     setInstructions(true)
    }
   }

   const secondChanceInput = () => {
    personalIDRef.current.value = ""
    setInstructions(false)
    setYouDisobeyedInstruction(false)
    setDisabledPid(false)
   }

   const checkNumber = (e) =>{
    if(parseInt(e.target.value)){
      setDisabledPid(false)
    }
    else{
      setDisabledPid(true)
      setYouDisobeyedInstruction(true)
    }
   
    
   }

  return (
  <FormInstructions 
  onSubmit={confirmSave}>
    {showModal && <ValidationModal
    title="Är du säker?"
    message="Det går ej att ångra."
    onClickYes={() => deleteTeacher}
    onClick={() => setShowModal(false)}
    />}
    <h1>Ändra profil:</h1>
    <div className="Row">
    <label 
          htmlFor="firstNameChangeInput">
          Tilltalsnamn:
    </label>
    <input 
          id="firstNameChangeInput"
          type="text"
          ref={firstNameRef}
          defaultValue={teacher.firstName}
    />
    </div>
    <div className="Row">
    <label 
          htmlFor="lastNameChangeInput">
          Efternamn:
    </label>
    <input 
          id="lastNameChangeInput"
          type="text"
          ref={lastNameRef}
          defaultValue={teacher.lastName}
    />
    </div>
    <div className="Row">
    <label 
          htmlFor="emailChangeInput">
          Email:
    </label>
    <input 
          id="emailChangeInput"
          type="email"
          ref={emailRef}
          defaultValue={teacher.email}
    />
    </div>
    <div className="Row">
    <label 
          htmlFor="pIDChangeInput">
          Personnummer:
    </label>
    <input 
          id="pIDChangeInput"
          type="text"
          maxLength={12}
          onChange={(e) => checkNumber(e)}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
          ref={personalIDRef}
          defaultValue={teacher.personalID}
          disabled={disabledPid ? true : false}
    />
    </div>
    {instructions && <>
    <p>{infoMessage}</p>
    {youDisobeyedInstruction && 
    <button onClick={secondChanceInput}>OK!</button>}
    </>}
    <div className="Row">
    <label 
          htmlFor="mobileNoChangeInput">
          Mobilnummer:
    </label>
    <input 
          id="mobileNoChangeInput"
          type="tel"
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
          ref={mobileNoRef}
          defaultValue={teacher.mobileNo}
          disabled={disabledPid ? true : false}
    />
    </div>
    <legend>
          Kompetenser:
    </legend>
    <TwoColumns>
    <div>
    {allaKompetenser.map((kitem, i) => {
      if(i % 2 === 0){
      if(teacher.competences.includes(kitem)){
        return (
          <CheckBoxComponent
          key={i}
          id ={`${kitem}${i}`}
          item= {kitem}
          isChecked = {true}
          />
        )
      }
     else{
      return (
        <CheckBoxComponent
        key={i}
        id ={`${kitem}${i}`}
        item= {kitem}
        isChecked = {false}
        />
      )
     }
      }})}
     </div>
     <div>
     {allaKompetenser.map((kitem, i) => {
      if(i % 2 !== 0){
      if(teacher.competences.includes(kitem)){
        return (
          <CheckBoxComponent
          key={i}
          id ={`${kitem}${i}`}
          item= {kitem}
          isChecked = {true}
          />
        )
      }
     else{
      return (
        <CheckBoxComponent
        key={i}
        id ={`${kitem}${i}`}
        item= {kitem}
        isChecked = {false}
        />
      )
     }
      }})}
     </div>
     </TwoColumns>
      <input 
      type="submit"
      value="Spara"/>
         <button 
      onClick={handleDiscard}>
        Stäng 
        </button>
        <button onClick={()=>setShowModal(true)}>
        Ta bort lärare
      </button>
  </FormInstructions>);
}
 
export default TeacherChangeForm;