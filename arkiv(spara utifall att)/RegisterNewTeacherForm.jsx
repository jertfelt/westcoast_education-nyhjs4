import { useEffect } from "react";
import { FormInstructions } from "../../StylingElements/Form/Form";
import { useFirebase } from "../../utils/useFirebase";
import { useState, useRef } from "react";
import { getDatabase, set, ref } from "firebase/database";
import Modal from "../../ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { Competences } from "./TeacherChangeForm";

const RegisterNewTeacherForm = ({kompetenser, onClick}) => {
  const {data} = useFirebase("/teachers")
  const navigate = useNavigate()
 
  const [instructions, setInstructions] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [youDisobeyedInstruction, setYouDisobeyedInstruction] = useState(false)
  const [disabledPid, setDisabledPid] = useState(false)
  const [instructionsKompetens, setInstructionsKompetens] = useState(false)
  const [moreThanOneCompetence, setMoreThanOneCompetence] = useState(null)
  const [selectedOption, setSelected] = useState([])
  const [selected, setSelectedSelect] = useState("")

  const [teacherID, setTeacherID] = useState(null)
  const [chosenCompetences, setCompetences] = useState([])
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const personalIDRef = useRef()
  const emailRef =  useRef()
  const mobileNoRef = useRef()



  useEffect(() => {
    if(data){
      setTeacherID(data.length) }
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
    }).then(setShowModal(true))
  }

const confirmSave =(e) =>{
  if(chosenCompetences == 0 || chosenCompetences == undefined){
    setShowModal2(true)
  }
  else{
  e.preventDefault()
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
    }
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


  return (
  <FormInstructions
  onSubmit={confirmSave}>
 {showModal && <Modal
    title="Välkommen!"
    message="Nu är läraren registrerad."
    onClick={() => navigate("/admin")}/>}
    
  {showModal2 && <Modal 
  title="Fel!"
  message="Du har glömt att välja kompetenser"
  onClick={onClick}/>}

    
  <div className="Row">
    <label 
          htmlFor="firstNameInput">
          Tilltalsnamn:
    </label>
    <input 
          id="firstNameInput"
          type="text"
          ref={firstNameRef}
          defaultValue="Tilltalsnamn"
    />
    </div>
    <div className="Row">
    <label 
          htmlFor="lastNameInput">
          Efternamn:
    </label>
    <input 
          id="lastNameInput"
          type="text"
          ref={lastNameRef}
          defaultValue="Efternamn"
    />
    </div>
    <div className="Row">
    <label 
          htmlFor="emailInput">
          Email:
    </label>
    <input 
          id="emailInput"
          type="email"
          ref={emailRef}
          defaultValue="email@westcoast.se"
    />
    </div>
    <div className="Row">
    <label 
          htmlFor="pIDInput">
          Personnummer:
    </label>
    <input 
          id="pIDInput"
          type="text"
          maxLength={12}
          onChange={(e) => checkNumber(e)}
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
          ref={personalIDRef}
          defaultValue="8905169899"
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
          htmlFor="mobileNoInput">
          Mobilnummer:
    </label>
    <input 
          id="mobileNoInput"
          type="tel"
          onFocus={(e) => instructionsUnclear(e)}
          onBlur={() => setInstructions(false)}
          ref={mobileNoRef}
          defaultValue="0736677881"
          disabled={disabledPid ? true : false}
    />
    </div>
    
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
        {kompetenser.map((kitem, i) =>{
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
         <input 
      type="submit"
      value="Spara"/>
      <button onClick={() => navigate(-1)}>Gå tillbaka</button>
  </FormInstructions>  );
}
 
export default RegisterNewTeacherForm;