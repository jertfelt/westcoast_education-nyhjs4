import { FormInstructions} from "../../StylingElements/Form/Form";
import ValidationModal from "../../ui/Modal/ValidationModal";
import Modal from "../../ui/Modal/Modal";
import { useFirebase } from "../../utils/useFirebase";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState,} from "react";
import { getDatabase, ref, set, remove} from "firebase/database"
import styled from "styled-components";

export const Competences = styled.div`
display:flex;

li{
  margin-top:-8px;
  list-style:none;
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:1rem;
  justify-content: center;
  button{
    margin-top:-1px;
  }
}
`


const TeacherChangeForm = ({teacher, onChange }) => {
  const navigate = useNavigate()
  const {data} = useFirebase("/competences")

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const personalIDRef = useRef()
  const emailRef =  useRef()
  const mobileNoRef = useRef()
  
  const [chosenCompetences, setCompetences] = useState([])
  const [teacherID, setTeacherID] = useState(teacher.id)
  const [allaKurser, setKurser] = useState([])
  const [selectedOption, setSelected] = useState(teacher.competences)
  const [selected, setSelectedSelect] = useState("")
  
  //form behaviours
  const [instructions, setInstructions] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")
  const [youDisobeyedInstruction, setYouDisobeyedInstruction] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [disabledPid, setDisabledPid] = useState(false)
  const [instructionsKompetens, setInstructionsKompetens] = useState(false)
  const [moreThanOneCompetence, setMoreThanOneCompetence] = useState(null)
  
  useEffect(() => {
    if(data){
      setKurser(data.map(item => item))
    }
  },[data])

    const sendEditToFirebase = (firstName, lastName, personalID, email, mobileNo, competences, ID) => {
      const db = getDatabase()
      set(ref(db, "/teachers/" + ID ),{
        competences: competences,
        id: ID,
        firstName : firstName,
        lastName: lastName,
        mobileNo: mobileNo,
        email: email,
        personalID: personalID,
      })
    }

    

  const confirmSave =(e) =>{
    e.preventDefault()
    
    if(chosenCompetences.length === 0){
      setCompetences(teacher.competences)
    }
      const firstName = firstNameRef.current.value 
      const lastName = lastNameRef.current.value
      const personalID = personalIDRef.current.value
      const email = emailRef.current.value
      const mobileNo = mobileNoRef.current.value
      const competences = chosenCompetences
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

  const handleSelect = (e) => {
    setSelected(prev => [...prev, e.target.value])
    setCompetences(prev => [...prev, e.target.value])
    
  }

  const takeAwaySelect = (e) => {
    if(selectedOption.length > 1){
      let newList = selectedOption.filter(item => item !== e.target.value)
      setSelected(newList)
      setCompetences(newList)
    }
    else{
      setInfoMessage("Du måste ha minst en kompetens!")
      setInstructionsKompetens(true)
    }
  }

  useEffect(() => {
    if(selectedOption.length === 1){
      setMoreThanOneCompetence(false)
    }
    else if(selectedOption.length > 1){
      setMoreThanOneCompetence(true)
    }
    else {
      setMoreThanOneCompetence(true)
    }
  },[selectedOption])

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

   const deleteTeacher = () =>{
    
    const db = getDatabase()
    remove(ref(db, "/teachers/" + teacherID)).then(()=>{
      setShowModal(false)
      showModal2(true)
      
    })
    
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
    {showModal2 && <Modal
    title="Hejdå!"
    message="Nu är läraren borta ur systemet."
    onClick={() => setShowModal2(false)}
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
 
   
     <div>
      <div className="Row">
      <label htmlFor="kompetenser">
        Lägg till kompetenser:
      </label>
      <select 
      id="kompetenser"
      data-testid="kompetensSelect"
      value={selected}
      onChange = {(e) => handleSelect(e)}
      >
        <option 
        value={"Välj:"} 
        data-testid="optionDefault"
        label={"Välj:"}/>
         {allaKurser.map((kitem, i) =>{
          if (!selectedOption.includes(kitem)){
          return(
            <option key={`${kitem}-${i}`}
          value={kitem}>
            {kitem}
          </option>
          )
        }
        })} 
      </select>
      </div>
      
      <h3>Valda kompetenser:</h3>
      {instructionsKompetens && <p>{infoMessage}</p>}
      {selectedOption.map(item => (
           <Competences 
           key={`${item}--${item}`}>
           <li>
            <p>{item}</p>
          {moreThanOneCompetence && <>
           <button value={item}
           onClick={takeAwaySelect}>Ta bort</button>
           </>}
           </li>
          
         </Competences>
        ))}
     </div>
      <input 
      type="submit"
      value="Spara"/>
      <button 
      onClick={onChange}>
        Stäng formulär 
      </button> 
      <button onClick={()=>setShowModal(true)}>
        Avskeda lärare
      </button>
  </FormInstructions>);
}
 
export default TeacherChangeForm;